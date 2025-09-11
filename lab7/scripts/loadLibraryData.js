document.addEventListener('DOMContentLoaded', function () {
    const dataContainer = document.getElementById('library-data-container');
    
    const mockApiEndpoints = {
        playlists: 'https://jsonplaceholder.typicode.com/posts',
        albums: 'https://jsonplaceholder.typicode.com/albums',
        artists: 'https://jsonplaceholder.typicode.com/users',
        tracks: 'https://jsonplaceholder.typicode.com/comments'
    };

    const tableHeaders = {
        playlists: ['Id', 'Title'],
        albums: ['Id', 'Title'],
        artists: ['Id', 'Name', 'Username', 'Email'],
        tracks: ['Id', 'Name']
    };

    let requestCount = 0;
    
    document.querySelectorAll('.library__link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.getAttribute('href').substring(1);
            fetchLibraryData(category);
        });
    });
    
    function fetchLibraryData(category) {
        console.log(`Запрос данных для категории: ${category}`); 
        if (!mockApiEndpoints[category]) {
            console.error(`Категория ${category} не найдена в mockApiEndpoints`);
            return;
        }

        const filterCondition = requestCount % 2 === 0 ? '?id_lte=20' : '?id_gte=20';
        const mockApiUrl = `${mockApiEndpoints[category]}${filterCondition}`;
        
        dataContainer.innerHTML = '<div class="preloader">Загрузка данных...</div>';

        fetch(mockApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then(data => {
                displayLibraryData(category, data);
            })
            .catch(error => {
                dataContainer.innerHTML = `<div class="error">⚠ ${error.message}</div>`;
            });
        requestCount++;
    }

    function displayLibraryData(category, data) {
        dataContainer.innerHTML = '';

        if (!data || data.length === 0) {
            dataContainer.innerHTML = `<p>⚠ Нет данных для отображения.</p>`;
            return;
        }

        const table = document.createElement('table');
        table.classList.add('data-table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = tableHeaders[category];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        const limitedData = data.slice(0, 20);

        limitedData.forEach(item => {
            const row = document.createElement('tr');

            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = item[header.toLowerCase()] || '';
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        dataContainer.appendChild(table);
    }
});
