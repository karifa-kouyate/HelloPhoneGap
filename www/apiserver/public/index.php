<?php
session_cache_limiter(false);
session_start();

define('DATABASE', __DIR__.'/../data.bin');

require __DIR__.'/../vendor/autoload.php';

$app = new Slim\Slim($config);


$app->get('/', function ()  use ($app) {
    echo ("this is an api please refer to the documentation");
});

$app->get('/list', function ()  use ($app) {
    $data=file_get_contents(DATABASE);
    $app->response->headers->set('Content-Type', 'application/json');
    echo ($data);
});

$app->post('/signup', function() use ($app){
    try {
        $data=file_get_contents(DATABASE);
        $data=json_decode($data);

        //check to avoid duplicate
        foreach ($data as $contact) {
            if($contact->email===$app->request->post('email')){
                echo ("exist");
                return;
            }
        }

        $data[]=array(
            'email'=>$app->request->post('email'),
            'name'=>$app->request->post('name'),
            'phone'=>$app->request->post('phone'),
        );

        $data=json_encode($data);
        file_put_contents(DATABASE, $data);

        echo ("ok");
    } catch (Exception $e) {
        echo ("error");
        echo $e->getMessage();
    }
});


$app->run();