 <!DOCTYPE html>
 <html lang="en">

 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">

 </head>

 <body>
     <div class="container my-5">
         <h2>List Of users</h2>
        
         <a class="btn btn-primary" href="create.php" role="button">New user</a>
         <br>
         <table class="table">

             <thead>
                 <tr>

                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Tel</th>
                     <th>Address</th>
                     <th>Creation-Date</th>
                     <th>Action</th>
                 </tr>
             </thead>
             <tbody>
                 <?php

                    $servername = "localhost";
                    $username = "root";
                    $password = "123";
                    $dbname = "myDb";

                    $connection = new mysqli($servername, $username, $password, $dbname);

                    if ($connection->connect_error) {
                        die("connection error occurred" . $connection->connect_error);
                    }

                    $sql = "SELECT *FROM users";
                    $result = $connection->query($sql);

                    if (!$result) {

                        die("Sorry! You have made invalid query");
                    }


                    while ($row = $result->fetch_assoc()) {
                        echo "
                    <tr>

                 <td>$row[ID]</td>
                 <td>$row[name]</td>
                 <td>$row[email]</td>
                 <td>$row[phone]</td>
                 <td>$row[address]</ td>
                 <td>$row[dateofcreation]</td>
                 <td>
                    <a class='btn btn-primary-btn-sm' href='./edit.php?id=$row[ID]'>Edit</a>
                    <a class='btn btn-danger btn-sm' href='./delete.php?id=$row[ID]'>Delete</a>
                 </td>
                </tr>
                    ";
                    }
                    ?>



             </tbody>

         </table>
     </div>
     <div class="container">
         <br />
         <br />
         <br />

         <div class="table-responsive">
             <h2 align="center">Export mysql data to excel in php</h2><br />
             <div id="live data"></div>

             <form action="excel.php" method="post">

                 <input type="submit" name="export_excel" class="btn btn-success" value="export to excel" />

             </form>

         </div>

     </div>

 </body>

 </html>