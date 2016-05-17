<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/global.css">
    <link rel="shortcut icon" type="image/png" href="img/logo.png"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Play:700,400&subset=cyrillic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    <script src="js/canvas.js"></script>
</head>
<head>
    <title>Маршруты</title>
</head>
<body>
<div class="wrapper">
    <header>
        <nav>
            <a href="index.php">Главная</a>
            <a href="edit.php">Редактирование</a>
            <a href="create.php">Создание</a>
        </nav>
        <div class="creator">
            <p>Подгорный Ярослав Викторович</p>
            <p>студент 326ст группы</p>
        </div>
    </header>
    <main>
        <h1>Проверка графа на планарность</h1>
        <canvas class="mainDraw" width="500" height="500"></canvas>
        <button class="makeResult" style="display: none">Найти все маршруты</button>
        <div class="result"></div>
        <button class="planar">Проверить на планарность</button>
        <div class="info">
            <button class="info__button">Информация</button>
            <button class="info__button">Примеры</button>
            <div class="info__wrapper">
                <div class="info__block">
                    <img src="img/info.jpg" alt="">
                </div>
                <div class="info__block">
                    <img src="img/exampl.jpg" alt="">
                </div>
            </div>
        </div>

        <div class="modal">
            <div class="modal__wrapper">
                <p class="modal__text">Граф планарный</p>
            </div>
        </div>
    </main>
    <footer>
        <div class="socSet">
            <ul>
                <li><a href="http://new.vk.com/jasik1995"><img src="img/vk.png" alt="vk"></a></li>
                <li>jasik2909@gmail.com</li>
            </ul>
        </div>
        <div class="rights">&COPY TeaDrinker</div>
    </footer>
</div>

</body>
</html>