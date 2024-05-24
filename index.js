$(document).ready(() => {
    const loadContent = (url, cityName) => {
        let query = $('#query').val();
        console.log(`Запрос: ${query}, Файл: ${cityName}`);
        $('#content').load(url, (response, status, xhr) => {
            if (status === "error") {
                alert(`Ошибка: ${xhr.status} ${xhr.statusText}`);
            } else {
                const parsedResponse = $.parseHTML(response);
                switch (query) {
                    case 'info':
                        const infoElement = parsedResponse.find(element => element.id === 'info');
                        const info = infoElement ? $(infoElement).html() : 'Информация не найдена';
                        $('#content').html(`<h2>Информация о городе ${cityName}</h2>` + info);
                        break;
                    case 'weather':
                        const weatherElement = parsedResponse.find(element => element.id === 'weather');
                        const weather = weatherElement ? $(weatherElement).text() : 'Погода не найдена';
                        $('#content').html(`<h2>Погода в городе ${cityName}</h2>` + weather);
                        break;
                    case 'attractions':
                        const attractionsElement = parsedResponse.find(element => element.id === 'attractions');
                        const attractions = attractionsElement ? $(attractionsElement).html() : 'Достопримечательности не найдены';
                        $('#content').html(`<h2>Достопримечательности города ${cityName}</h2>` + attractions);
                        break;
                    default:
                        break;
                }
            }
        });
    };

    const disableButtonTemporarily = (button) => {
        button.prop('disabled', true);
        setTimeout(() => {
            button.prop('disabled', false);
        }, 3000);
    };

    $('#loadContent1').on('click', () => {
        loadContent('city1.html', 'City 1');
        disableButtonTemporarily($('#loadContent1'));
    });

    $('#loadContent2').on('click', () => {
        loadContent('city2.html', 'City 2');
        disableButtonTemporarily($('#loadContent2'));
    });

    $('#loadContent3').on('click', () => {
        loadContent('city3.html', 'City 3');
        disableButtonTemporarily($('#loadContent3'));
    });

    $('#loadContent4').on('click', () => {
        loadContent('city4.html', 'City 4');
        disableButtonTemporarily($('#loadContent4'));
    });

    $('#loadJSON').on('click', () => {
        loadJSONContent('city5.json', 'City 5');  // Assuming the updated JSON is city5.json
    });
    const loadJSONContent = (url, cityName) => {
        let query = $('#query').val();
        console.log(`Запрос: ${query}, Файл: ${url}`);
        $.getJSON(url, data => {
            let content = `<h2>Запрос: ${query}</h2>`;
            switch (query) {
                case 'info':
                    content += `<h3>Информация о городе ${cityName}</h3><p>${data.info}</p>`;
                    break;
                case 'weather':
                    content += `<h3>Погода в городе ${cityName}</h3><p>${data.weather}</p>`;
                    break;
                case 'attractions':
                    content += `<h3>Достопримечательности города ${cityName}</h3><ul>`;
                    $.each(data.attractions, (index, item) => {
                        content += `<li>${item}</li>`;
                    });
                    content += '</ul>';
                    break;
                default:
                    content += '<p>Запрос не распознан.</p>';
                    break;
            }
            $('#jsonContent').html(content);
        }).fail(() => {
            alert('Ошибка загрузки JSON данных.');
        });
        disableButtonTemporarily($('#loadJSON'));
    };

    $(document).ajaxSend(() => {
        console.log("Запрос отправлен");
    });

    $(document).ajaxComplete(() => {
        console.log("Запрос завершён");
    });

    $(document).ajaxSuccess(() => {
        console.log("Запрос выполнен успешно");
    });

    $(document).ajaxError(() => {
        console.log("Ошибка выполнения запроса");
    });

    $(document).ajaxStart(() => {
        console.log("Запрос начат");
    });

    $(document).ajaxStop(() => {
        console.log("Все запросы завершены");
    });

});
