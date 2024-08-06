<?php

namespace App\Enums;

class Roles
{
    public static $OWNER;
    public static $MANAGER;
    public static $STAFF;

    public static function initialize()
    {
        self::$OWNER = env("OWNER_ROLE", null);
        self::$MANAGER = env("MANAGER_ROLE", null);
        self::$STAFF = env("STAFF_ROLE", null);
    }
}
