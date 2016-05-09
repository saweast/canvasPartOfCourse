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
    <script src="js/create.js"></script>
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
        <div class="creator">
            <p>Лаворчук Вадим Игоревич</p>
            <p>студент 326ст группы</p>
        </div>
    </header>
    <main>
        <form>
            <label>Название вершины <input type="text" placeholder="Название" class="inName"></label>
            <label>Координаты<br>
            x: <input type="number" placeholder="от 0 до 500" class="inX"></label>
            <label>y: <input type="number" placeholder="от 0 до 500" class="inY"></label>
            <label for="">Изображение
                <select class="imageSelect">
                    <option selected disabled>Выберите картинку</option>
                    <option value="0">Apartment-Building</option>
                    <option value="1">Contract</option>
                    <option value="2">Factory</option>
                    <option value="3">House</option>
                    <option value="4">House-Rent</option>
                    <option value="5">House-Sale</option>
                    <option value="6">Lands</option>
                    <option value="7">Mortgage</option>
                    <option value="8">Office-Building</option>
                    <option value="9">Swimming-Pool</option>
                </select>
            </label>
            <label>Связь
                <select class="edgeSelect" multiple class="inEdges">
                    <option value="0">Название 1</option>
                    <option value="1">Название 2</option>
                    <option value="2">Название 3</option>
                    <option value="3">Название 4</option>
                    <option value="4">Название 5</option>
                    <option value="5">Название 6</option>
                    <option value="6">Название 7</option>
                </select>
            </label>
            <button class="createButton" onclick="return false;">Создать</button>
        </form>
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