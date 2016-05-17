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
    <title>Создать</title>
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
        <form>
            <h1>Создание новой вершины</h1>
            <label>Название вершины <input type="text" placeholder="Название" class="inName"></label>
            <label>Координаты<br>
            x: <input type="number" placeholder="от 0 до 500" class="inX"></label>
            <label>y: <input type="number" placeholder="от 0 до 500" class="inY"></label>
            <label for="">Изображение
                <select class="imageSelect">
                    <option selected disabled>Выберите картинку</option>
                    <option value="0">APUNAH</option>
                    <option value="1">BART</option>
                    <option value="2">DRHIBB</option>
                    <option value="3">HOMER</option>
                    <option value="4">KENTBR</option>
                    <option value="5">LISA</option>
                    <option value="6">MAGGIE</option>
                    <option value="7">MARGE</option>
                    <option value="8">MILHOU</option>
                    <option value="9">POLICE</option>
                </select>
            </label>
            <label>Связь
                <select class="edgeSelect" multiple>
                </select>
            </label>
            <button class="createButton" onclick="return false;">Создать</button>
        </form>
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