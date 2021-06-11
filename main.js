$(document).ready(function () {

    // показать форму регистрации
    $(document).on('click', '#sign_up', function () {
        let html = `
            <h2>Регистрация</h2>
            <form id='sign_up_form'">
                <div class="form-group">
                    <label for="username">Имя</label>
                    <input type="text" class="form-control" name="username" id="username" required />
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" class="form-control" name="password" id="password" required />
                </div>

                <button type='submit' class='btn btn-primary'">Регистрация</button>
            </form>
        `;

        clearResponse();
        $('#content').html(html);
    });

    $(document).on('submit', '#sign_up_form', function () {

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

// показать форму регистрации
    $(document).on('click', '#go_to_signup', function (e) {
        e.preventDefault();
        // showLoginPage();
        $('.form_login').hide();
        $('.form_signup').show();

    });

    // показать форму входа
    $(document).on('click', '#button_signup', function (e) {
        e.preventDefault();
        // showLoginPage();
        $('.form_signup').hide();
        $('.form_login').show();

    });

    $(document).on('click', '#go_to_students_list', function (e) {
        e.preventDefault();

        $('.form_login').hide();
        $('.container_for_students_list').show();
        getStudents();
        $('#login_form').trigger("reset");
    })

// при отправке формы входа
    $(document).on('submit', '#login_form', function () {

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
            },


        });

        return false;
    });

    // выйти из системы
    $(document).on('click', '#logout_button', function () {
        $(".form_login").show();
        $(".container_for_students_list").hide();
        deleteJwt();
    });

    // Удаление всех быстрых сообщений
    function clearResponse() {
        $('#response').html('');
    }

    function deleteJwt() {
        // удаление jwt
        setCookie("jwt", "", 1);
        clearResponse();
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
        $(".form_login").show();
        $(".container_for_students_list").hide(); // скрыть кнопку выхода
    }

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
        
            <tr class="num">
                <td class="student_name"> 
                    <span><i class="fa fa-check-circle-o" aria-hidden="true"></i>
                        </i> ${student.firstname}</span> 
                    <span>${student.surname}</span> 
                </td>
                <td>${student.group}</td>
            </tr>
        `
    })
}

// // пагинация
// let table = document.getElementById("table_students_list");
// let tbodyRowCount = table.tBodies[0].rows.length;
// console.log (tbodyRowCount);