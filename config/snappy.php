<?php

return array(


    'pdf' => array(
        'enabled' => true,
        'binary'  => base_path('vendor/h4cc/wkhtmltopdf-amd64/bin/wkhtmltopdf-amd64'),
        'timeout' => false,
        'options' => [
            'margin-top'    => 16,
            'margin-right'  => 0,
            'margin-bottom' => 14,
            'margin-left'   => 0,
            //'header-spacing'=> -16,
            'page-size'=>'A4'
        ],
        'env'     => array(),
    ),
    'image' => array(
        'enabled' => true,
        'binary'  => base_path('vendor/h4cc/wkhtmltoimage-amd64/bin/wkhtmltoimage-amd64'),
        'timeout' => false,
        'options' => array(),
        'env'     => array(),
    ),


);
