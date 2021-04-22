--CREATE SENSOR TABLE 

CREATE SEQUENCE public.sensor_id_sensor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.sensor
(
    id_sensor integer NOT NULL DEFAULT nextval('sensor_id_sensor_seq'::regclass),
    descripcion character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sensor_pkey PRIMARY KEY (id_sensor)
);

INSERT INTO public.sensor (descripcion) VALUES ('hogar');

--CREATE HUMIDITY TABLE

CREATE SEQUENCE public."humidityMeasure_id_hum_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    
CREATE TABLE public.humiditymeasure
(
    id_hum integer NOT NULL DEFAULT nextval('"humidityMeasure_id_hum_seq"'::regclass),
    value double precision NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now(),
    id_sensor bigint NOT NULL,
    CONSTRAINT "humidityMeasure_pkey" PRIMARY KEY (id_hum),
    CONSTRAINT id_sensor FOREIGN KEY (id_sensor)
        REFERENCES public.sensor (id_sensor) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

--CREATE TEMPERATURE TABLE

CREATE SEQUENCE public."temperatureMeasure_id_temp_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    
CREATE TABLE public.temperaturemeasure
(
    id_temp integer NOT NULL DEFAULT nextval('"temperatureMeasure_id_temp_seq"'::regclass),
    value double precision NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now(),
    id_sensor bigint NOT NULL,
    CONSTRAINT "temperatureMeasure_pkey" PRIMARY KEY (id_temp),
    CONSTRAINT id_sensor FOREIGN KEY (id_sensor)
        REFERENCES public.sensor (id_sensor) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
