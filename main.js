$(document).ready(function () {

    // // показать форму регистрации
    // $(document).on('click', '#sign_up', function () {
    //     let html = `
    //         <h2>Регистрация</h2>
    //         <form id='sign_up_form'">
    //             <div class="form-group">
    //                 <label for="username">Имя</label>
    //                 <input type="text" class="form-control" name="username" id="username" required />
    //             </div>
    //
    //             <div class="form-group">
    //                 <label for="password">Пароль</label>
    //                 <input type="password" class="form-control" name="password" id="password" required />
    //             </div>
    //
    //             <button type='submit' class='btn btn-primary'">Регистрация</button>
    //         </form>
    //     `;
    //
    //     clearResponse();
    //     $('#content').html(html);
    // });

    $('#sign_up_form').on('submit', function () {

        // получаем данные формы
        let sign_up_form = $(this);
        let form_data = JSON.stringify(sign_up_form.serializeObject());

        // отправить данные формы в API
        $.ajax({
            url: "http://localhost/rest-api-authentication/api/",
            // url: "api/user",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function (result) {
                // в случае удачного завершения запроса к серверу,
                // сообщим пользователю, что он успешно зарегистрировался и очистим поля ввода
                $('#response').html("<div class='alert alert-success'>Регистрация завершена успешно. Пожалуйста, войдите.</div>");
                sign_up_form.find('input').val('');
            },
            error: function (xhr, resp, text) {
                // при ошибке сообщить пользователю, что регистрация не удалась
                $('#response').html("<div class='alert alert-danger'>Невозможно зарегистрироваться. Пожалуйста, свяжитесь с администратором.</div>");
            }
        });

        return false;
    });

// // показать форму входа
//     $(document).on('click', '#login', function () {
//         showLoginPage();
//     });

// при отправке формы входа
    $('#login_form').on('submit', function () {

        // получаем данные формы
        let login_form = $(this);
        let form_data = JSON.stringify(login_form.serializeObject());

        // отправить данные формы в API
        $.ajax({
            url: "api/login.php",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function (result) {

                // сохранить JWT в куки
                setCookie("jwt", result.jwt, 1);

                // показать домашнюю страницу и сообщить пользователю, что вход был успешным
                showStudentsPage();
                $('#response').html("<div class='alert alert-success'>Успешный вход в систему.</div>");

            },
            error: function (xhr, resp, text) {
                // при ошибке сообщим пользователю, что вход в систему не выполнен и очистим поля ввода
                $('#response').html("<div class='alert alert-danger'>Ошибка входа. Имя или пароль указан неверно.</div>");
                login_form.find('input').val('');
            }
        });

        return false;
    });

// показать домашнюю страницу
    $('#student').on('click', function () {
        showStudentsPage();
        clearResponse();
    });

// выйти из системы
    $('#logout').on('click', function () {
        showLoginPage();
        $('#response').html("<div class='alert alert-info'>Вы вышли из системы.</div>");
    });

    // Удаление всех быстрых сообщений
    function clearResponse() {
        $('#response').html('');
    }

    // функция показывает HTML-форму для входа в систему.
    function showLoginPage() {

        // удаление jwt
        setCookie("jwt", "", 1);

        // форма входа
        var html = `
        <h2>Вход</h2>
        <form id='login_form'>
            <div class='form-group'>
                <label for='username'>Имя</label>
                <input type='text' class='form-control' id='username' name='username' placeholder='Введите имя'>
            </div>

            <div class='form-group'>
                <label for='password'>Пароль</label>
                <input type='password' class='form-control' id='password' name='password' placeholder='Введите пароль'>
            </div>
 
            <button type='submit' class='btn btn-primary'>Войти</button>
        </form>
        `;

        $('#content').html(html);
        clearResponse();
        showLoggedOutMenu();
    }

// сохранение JWT в файле cookie
    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

// эта функция сделает меню похожим на опции для пользователя, вышедшего из системы.
    function showLoggedOutMenu() {
        // показать кнопку входа и регистрации в меню навигации
        $("#login, #sign_up").show();
        $("#logout").hide(); // скрыть кнопку выхода
    }

// функция показать домашнюю страницу
//     function showStudentsPage() {
//
//         // валидация JWT для проверки доступа
//         let jwt = getCookie('jwt');
//         $.post("api/validate_token.php", JSON.stringify({jwt: jwt})).done(function (result) {
//
//             let html = `
//                 <div class="container">
//                     <h2>Список студентов</h2>
//                     <div class="row list_title">
//                         <div class="col-sm text_center">
//                             Student's id
//                         </div>
//                         <div class="col-sm text_center">
//                             Student's firstname
//                         </div>
//                         <div class="col-sm text_center">
//                             Student's surname
//                         </div>
//                     </div>
//                 </div>
//                 <div class="container list_students">
//
//                 </div>
//         `;
//             getStudents();
//             $('#content').html(html);
//             showLoggedInMenu();
//         })
//
//             // показать страницу входа при ошибке
//             .fail(function (result) {
//                 showLoginPage();
//                 $('#response').html("<div class='alert alert-danger'>Пожалуйста войдите, чтобы получить доступ к списку студентов</div>");
//             });
//     }

// Функция поможет нам прочитать JWT, который мы сохранили ранее.
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // функция для преобразования значений формы в формат JSON
    $.fn.serializeObject = function () {

        let o = {};
        let a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

});
async function getStudents() {
    let result = await fetch('http://localhost/rest-api-authentication/api/students');
    let students = await result.json();

    students.forEach((student) => {
        document.querySelector('.list_students').innerHTML += `
        <div class="row">
            <div class="col-sm text_center">
                ${student.id}
            </div>
            <div class="col-sm text_center">
                ${student.firstname}
            </div>
            <div class="col-sm text_center">
                ${student.surname}
            </div>
        </div>
        `
    })
}

