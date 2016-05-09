<?php
/**
 * Created by PhpStorm.
 * User: lavor
 * Date: 09.05.2016
 * Time: 21:10
 */
$mes = $_REQUEST['q'];

$pieces = explode("~", $mes);
$fileStream = fopen("data/tops.json", "w") or die ("Cannot write to file @tops.json");
fwrite($fileStream, $pieces[0]);
fclose($fileStream);
$fileStream = fopen("data/edges.json", "w") or die ("Cannot write to file @tops.json");
fwrite($fileStream, $pieces[1]);
fclose($fileStream);

?>