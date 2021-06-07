$(document).ready(function () {

    // показать форму регистрации
    $(document).on('click', '#sign_up', function(){

        let html = `
            <h2>Регистрация</h2>
            <form id='sign_up_form' method="post" action="api/index.php">
                <div class="form-group">
                    <label for="username">Имя</label>
                    <input type="text" class="form-control" name="username" id="username" required />
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" class="form-control" name="password" id="password" required />
                </div>

                <button type='submit' class='btn btn-primary signup_button' onclick="createUser()">Зарегистрироваться</button>
            </form>
        `;

        clearResponse();
        $('#content').html(html);
    });

        $(document).on('submit', '#sign_up_form', function(){

            // получаем данные формы
            let sign_up_form=$(this);
            let form_data=JSON.stringify(sign_up_form.serializeObject());

            // отправить данные формы в API
            $.ajax({
                url: "http://localhost/rest-api-authentication/api/user",
                type : "POST",
                contentType : 'application/json',
                data : form_data,
                success : function(result) {
                    // в случае удачного завершения запроса к серверу,
                    // сообщим пользователю, что он успешно зарегистрировался и очистим поля ввода
                    $('#response').html("<div class='alert alert-success'>Регистрация завершена успешно. Пожалуйста, войдите.</div>");
                    sign_up_form.find('input').val('');
                },
                error: function(xhr, resp, text){
                    // при ошибке сообщить пользователю, что регистрация не удалась
                    $('#response').html("<div class='alert alert-danger'>Невозможно зарегистрироваться. Пожалуйста, свяжитесь с администратором.</div>");
                }
            });

            return false;
        });

// показать форму входа
        $(document).on('click', '#login', function(){
            showLoginPage();
        });

// при отправке формы входа
        $(document).on('submit', '#login_form', function(){

            // получаем данные формы
            let login_form=$(this);
            let form_data=JSON.stringify(login_form.serializeObject());

            // отправить данные формы в API
            $.ajax({
                url: "api/login.php",
                type : "POST",
                contentType : 'application/json',
                data : form_data,
                success : function(result){

                    // сохранить JWT в куки
                    setCookie("jwt", result.jwt, 1);

                    // показать домашнюю страницу и сообщить пользователю, что вход был успешным
                    showHomePage();
                    $('#response').html("<div class='alert alert-success'>Успешный вход в систему.</div>");

                },
                error: function(xhr, resp, text){
                    // при ошибке сообщим пользователю, что вход в систему не выполнен и очистим поля ввода
                    $('#response').html("<div class='alert alert-danger'>Ошибка входа. Email или пароль указан неверно.</div>");
                    login_form.find('input').val('');
                }
            });

            return false;
        });

// показать домашнюю страницу
        $(document).on('click', '#home', function(){
            showHomePage();
            clearResponse();
        });

        $(document).on('click', '#update_account', function(){
            showUpdateAccountForm();
        });

// срабатывание при отправке формы «обновить аккаунт»
        $(document).on('submit', '#update_account_form', function(){

            // дескриптор для update_account_form
            let update_account_form=$(this);

            // валидация JWT для проверки доступа
            let jwt = getCookie('jwt');

            // получаем данные формы
            let update_account_form_obj = update_account_form.serializeObject()

            // добавим JWT
            update_account_form_obj.jwt = jwt;

            // преобразуем значения формы в JSON с помощью функции stringify ()
            let form_data=JSON.stringify(update_account_form_obj);

            // отправить данные формы в API
            $.ajax({
                url: "api/update_user.php",
                type : "POST",
                contentType : 'application/json',
                data : form_data,
                success : function(result) {

                    // сказать, что учетная запись пользователя была обновлена
                    $('#response').html("<div class='alert alert-success'>Учетная запись обновлена.</div>");

                    // сохраняем новый JWT в cookie
                    setCookie("jwt", result.jwt, 1);
                },

                // показать сообщение об ошибке пользователю
                error: function(xhr, resp, text){
                    if(xhr.responseJSON.message=="Невозможно обновить пользователя."){
                        $('#response').html("<div class='alert alert-danger'>Невозможно обновить пользователя.</div>");
                    }

                    else if(xhr.responseJSON.message=="Доступ закрыт."){
                        showLoginPage();
                        $('#response').html("<div class='alert alert-success'>Доступ закрыт. Пожалуйста войдите</div>");
                    }
                }
            });

            return false;
        });

// выйти из системы
        $(document).on('click', '#logout', function(){
            showLoginPage();
            $('#response').html("<div class='alert alert-info'>Вы вышли из системы.</div>");
        });

    // Удаление всех быстрых сообщений
    function clearResponse(){
    $('#response').html('');
}

        // функция показывает HTML-форму для входа в систему.
        function showLoginPage(){

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

// функция setCookie() поможет нам сохранить JWT в файле cookie
        function setCookie(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

// эта функция сделает меню похожим на опции для пользователя, вышедшего из системы.
        function showLoggedOutMenu(){
            // показать кнопку входа и регистрации в меню навигации
            $("#login, #sign_up").show();
            $("#logout").hide(); // скрыть кнопку выхода
        }

// функция показать домашнюю страницу
        function showHomePage(){

            // валидация JWT для проверки доступа
            let jwt = getCookie('jwt');
            $.post("api/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {

                // если прошел валидацию, показать домашнюю страницу
                let html = `
            <div class="card">
                <div class="card-header">Добро пожаловать!</div>
                <div class="card-body">
                    <h5 class="card-title">Вы вошли в систему.</h5>
                    <p class="card-text">Вы не сможете получить доступ к домашней странице и страницам учетной записи, если вы не вошли в систему.</p>
                </div>
            </div>
        `;

                $('#content').html(html);
                showLoggedInMenu();
            })

                // показать страницу входа при ошибке
                .fail(function(result){
                    showLoginPage();
                    $('#response').html("<div class='alert alert-danger'>Пожалуйста войдите, чтобы получить доступ к домашней станице</div>");
                });
        }

// Функция поможет нам прочитать JWT, который мы сохранили ранее.
        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' '){
                    c = c.substring(1);
                }

                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

// если пользователь залогинен
        function showLoggedInMenu(){
            // скрыть кнопки вход и зарегистрироваться с панели навигации и показать кнопку выхода
            $("#login, #sign_up").hide();
            $("#logout").show();
        }

        function showUpdateAccountForm(){
            // валидация JWT для проверки доступа
            let jwt = getCookie('jwt');
            $.post("api/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {

                // если валидация прошла успешно, покажем данные пользователя в форме
                let html = `
            <h2>Обновление аккаунта</h2>
            <form id='update_account_form'>
                <div class="form-group">
                    <label for="firstname">Имя</label>
                    <input type="text" class="form-control" name="firstname" id="firstname" required value="` + result.data.firstname + `" />
                </div>

                <div class="form-group">
                    <label for="lastname">Фамилия</label>
                    <input type="text" class="form-control" name="lastname" id="lastname" required value="` + result.data.lastname + `" />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email" required value="` + result.data.email + `" />
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" class="form-control" name="password" id="password" />
                </div>

                <button type='submit' class='btn btn-primary'>
                    Сохранить
                </button>
            </form>
        `;

                clearResponse();
                $('#content').html(html);
            })

                // в случае ошибки / сбоя сообщите пользователю, что ему необходимо войти в систему, чтобы увидеть страницу учетной записи.
                .fail(function(result){
                    showLoginPage();
                    $('#response').html("<div class='alert alert-danger'>Пожалуйста, войдите, чтобы получить доступ к странице учетной записи.</div>");
                });
        }

        // функция для преобразования значений формы в формат JSON
        $.fn.serializeObject = function(){

            let o = {};
            let a = this.serializeArray();
            $.each(a, function() {
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
