CREATE TABLE blood_data_timelines (
  id SERIAL PRIMARY KEY,
  nano_tumor_id VARCHAR,
  time_point NUMERIC,
  plama_id_pc FLOAT
);

CREATE TABLE biodistribution_timelines (
  id SERIAL PRIMARY KEY,
  nano_tumor_id VARCHAR,
  time_point NUMERIC,
  tumor FLOAT,
  heart FLOAT,
  liver FLOAT,
  spleen FLOAT,
  lung FLOAT,
  kidney FLOAT
);

CREATE TABLE nanoparticles (
  id SERIAL PRIMARY KEY,
  nano_tumor_id VARCHAR,
  particle_type VARCHAR,
  core_material VARCHAR,
  targeting_strategy VARCHAR,
  nanomedicine_id VARCHAR,
  shape VARCHAR,
  pdi FLOAT,
  size_tem FLOAT,
  size_hd FLOAT,
  zeta_potential NUMERIC,
  tumor_cell VARCHAR,
  tumor_size NUMRANGE,
  np_administration VARCHAR,
  bw_np_administration NUMRANGE,
  animal VARCHAR,
  reference VARCHAR,
  blood_type VARCHAR
);

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  auth0_id varchar UNIQUE,
  username varchar(64),
  email varchar(254),
  auth0_app_metadata jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (now()) NOT NULL,
  modified_at TIMESTAMP WITH TIME ZONE DEFAULT (now()) NOT NULL
);
