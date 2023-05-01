<?php

$connect = mysqli_connect("localhost","root","","herve");
$output = ' ';

if(isset($_POST["export_excel"])){
    $sql = "SELECT * FROM users ORDER BY id DESC";

    $result = mysqli_query($connect,  $sql);

    if(mysqli_num_rows($result) > 0){
        $output .='
             <table class="table" bordered="1">   
             <tr>
             <th>ID</th>
             <th>Name</th>
             <th>email</th>
             <th>phone</th>
             <th>address</th>
             
             </tr> 
        ';
 
        while($row = mysqli_fetch_array($result)){
            $output .= '
                  <tr>

                  <td>'.$row["ID"].'</td>
                  <td>'.$row["name"].'</td>
                  <td>'.$row["email"].'</td>
                  <td>'.$row["phone"].'</td>
                  <td>'.$row["address"].'</td>

                  </tr>
            ';
        }

        $output .= '</table>';
        header("Content-Type:  application/xls");
        header("Content-Disposition: attachment;    filename=download.xls");
        echo $output;
    }
}
?>