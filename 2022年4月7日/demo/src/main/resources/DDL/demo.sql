-- auto-generated definition
create table demo
(
    id       int auto_increment
        primary key,
    username varchar(45) charset utf8 not null comment '用户名',
    nickname varchar(45) charset utf8 null comment '昵称',
    email    varchar(45) charset utf8 null comment '邮箱',
    phone    varchar(45) charset utf8 null comment '电话',
    address  varchar(45) charset utf8 null comment '地址',
    constraint demo_id_uindex
        unique (id),
    constraint demo_username_uindex
        unique (username)
);

