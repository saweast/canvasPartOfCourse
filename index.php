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
    <!--<script src="js/cycles.js"></script>-->
    <title>Маршруты</title>
</head>
<body>
<div class="wrapper">
    <header>
        <div class="logo">
            <a href="#">
                <img src="img/logo.png" alt="">
            </a>
        </div>
        <nav>
            <a href="index.php">index</a>
            <a href="edit.php">edit</a>
            <a href="create.php">create</a>
        </nav>
        <div class="creator">
            <p>Лаворчук Вадим Игоревич</p>
            <p>студент 326ст группы</p>
        </div>
    </header>
    <main>
        <h1>Нахождение всех возможных маршрутов</h1>
        <canvas class="mainDraw" width="500" height="500"></canvas>
        <button class="makeResult">Найти все маршруты</button>
        <div class="result"></div>
    </main>
    <footer>
        <div class="socSet">
            <ul>
                <li><a href="http://vk.com/teadrinker95"><img src="img/vk.png" alt="vk"></a></li>
                <li><a href="https://twitter.com/teadrinker95"><img src="img/twitter.png" alt="twitter"></a></li>
                <li>lavorchukvadim@gmail.com</li>
            </ul>
        </div>
        <div class="rights">&COPY TeaDrinker</div>
    </footer>
</div>

</body>
</html>