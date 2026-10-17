CREATE TYPE "public"."actor_type" AS ENUM('system', 'user');--> statement-breakpoint
CREATE TYPE "public"."ingestion_status" AS ENUM('pending', 'running', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."region_type" AS ENUM('state', 'district', 'block', 'village', 'planning_region');--> statement-breakpoint
CREATE TYPE "public"."habitation_status" AS ENUM('awaiting_decision', 'survey_complete', 'relocation_approved', 'in_progress');--> statement-breakpoint
CREATE TYPE "public"."hazard_type" AS ENUM('landslide', 'flood', 'coastal_erosion', 'cloudburst', 'multi_hazard');--> statement-breakpoint
CREATE TYPE "public"."land_class" AS ENUM('government_revenue', 'forest_cleared', 'acquired_private', 'panchayat');--> statement-breakpoint
CREATE TYPE "public"."priority_level" AS ENUM('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');--> statement-breakpoint
CREATE TYPE "public"."relocation_timeline" AS ENUM('immediate', 'short_term', 'medium_term', 'monitoring');--> statement-breakpoint
CREATE TYPE "public"."service_rating" AS ENUM('adequate', 'partial', 'inadequate', 'unassessed');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('critical', 'high', 'moderate', 'low');--> statement-breakpoint
CREATE TYPE "public"."site_status" AS ENUM('commissioned', 'development', 'identified', 'assessment_pending');--> statement-breakpoint
CREATE TYPE "public"."site_suitability" AS ENUM('suitable', 'conditionally_suitable', 'requires_assessment', 'not_suitable');--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"actor_type" "actor_type" NOT NULL,
	"actor_id" varchar(64),
	"event_name" varchar(160) NOT NULL,
	"resource_type" varchar(120) NOT NULL,
	"resource_id" varchar(64),
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "data_sources" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"kind" varchar(80) NOT NULL,
	"description" text NOT NULL,
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ingestion_runs" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"data_source_id" varchar(64) NOT NULL,
	"status" "ingestion_status" NOT NULL,
	"summary" jsonb,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"type" "region_type" NOT NULL,
	"parent_region_id" varchar(64),
	"boundary_geom" geometry(MultiPolygon, 4326),
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "disaster_events" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"habitation_id" varchar(64) NOT NULL,
	"year" integer NOT NULL,
	"type" "hazard_type" NOT NULL,
	"description" text NOT NULL,
	"casualties" integer DEFAULT 0 NOT NULL,
	"displaced" integer DEFAULT 0 NOT NULL,
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habitation_risk_assessments" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"habitation_id" varchar(64) NOT NULL,
	"hazard_score" double precision NOT NULL,
	"vulnerability_score" double precision NOT NULL,
	"history_score" double precision NOT NULL,
	"exposure_score" double precision NOT NULL,
	"infrastructure_score" double precision NOT NULL,
	"composite_score" double precision NOT NULL,
	"priority_level" "priority_level" NOT NULL,
	"timeline" "relocation_timeline" NOT NULL,
	"confidence_score" double precision DEFAULT 0.85 NOT NULL,
	"factors_breakdown" jsonb NOT NULL,
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habitations" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"region_id" varchar(64),
	"name" varchar(160) NOT NULL,
	"block" varchar(120) NOT NULL,
	"district" varchar(120) NOT NULL,
	"state" varchar(120) NOT NULL,
	"population" integer NOT NULL,
	"households" integer NOT NULL,
	"primary_hazard" "hazard_type" NOT NULL,
	"red_zone_id" varchar(64),
	"vulnerability" "severity" NOT NULL,
	"priority" "priority_level" NOT NULL,
	"timeline" "relocation_timeline" NOT NULL,
	"status" "habitation_status" DEFAULT 'awaiting_decision' NOT NULL,
	"elevation_m" double precision NOT NULL,
	"slope_deg" double precision NOT NULL,
	"distance_to_river_km" double precision NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"point_geom" geometry(Point, 4326),
	"factors" jsonb NOT NULL,
	"demographics" jsonb NOT NULL,
	"infrastructure" jsonb NOT NULL,
	"candidate_site_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"last_survey" varchar(40) NOT NULL,
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "red_zones" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"district" varchar(120) NOT NULL,
	"state" varchar(120) NOT NULL,
	"primary_hazard" "hazard_type" NOT NULL,
	"secondary_hazards" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"severity" "severity" NOT NULL,
	"area_sq_km" double precision NOT NULL,
	"affected_population" integer NOT NULL,
	"affected_habitations" integer NOT NULL,
	"status" varchar(40) DEFAULT 'notified' NOT NULL,
	"radius_km" double precision NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"boundary_geom" geometry(MultiPolygon, 4326),
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relocation_recommendations" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"habitation_id" varchar(64) NOT NULL,
	"site_id" varchar(64),
	"priority_index" double precision NOT NULL,
	"urgency" varchar(40) NOT NULL,
	"window" varchar(60) NOT NULL,
	"headline" text NOT NULL,
	"evidence" text NOT NULL,
	"recommendation" text NOT NULL,
	"status" varchar(40) DEFAULT 'pending_review' NOT NULL,
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relocation_sites" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"block" varchar(120) NOT NULL,
	"district" varchar(120) NOT NULL,
	"state" varchar(120) NOT NULL,
	"land_class" "land_class" NOT NULL,
	"area_hectares" double precision NOT NULL,
	"carrying_capacity" integer NOT NULL,
	"current_occupancy" integer DEFAULT 0 NOT NULL,
	"projected_requirement" integer DEFAULT 0 NOT NULL,
	"services" jsonb NOT NULL,
	"shelter_capacity" integer DEFAULT 0 NOT NULL,
	"distance_to_nearest_habitation_km" double precision NOT NULL,
	"hazard_exposure" "severity" NOT NULL,
	"suitability" "site_suitability" NOT NULL,
	"status" "site_status" NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"point_geom" geometry(Point, 4326),
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_demo_data" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ingestion_runs" ADD CONSTRAINT "ingestion_runs_data_source_id_data_sources_id_fk" FOREIGN KEY ("data_source_id") REFERENCES "public"."data_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disaster_events" ADD CONSTRAINT "disaster_events_habitation_id_habitations_id_fk" FOREIGN KEY ("habitation_id") REFERENCES "public"."habitations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitation_risk_assessments" ADD CONSTRAINT "habitation_risk_assessments_habitation_id_habitations_id_fk" FOREIGN KEY ("habitation_id") REFERENCES "public"."habitations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitations" ADD CONSTRAINT "habitations_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitations" ADD CONSTRAINT "habitations_red_zone_id_red_zones_id_fk" FOREIGN KEY ("red_zone_id") REFERENCES "public"."red_zones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relocation_recommendations" ADD CONSTRAINT "relocation_recommendations_habitation_id_habitations_id_fk" FOREIGN KEY ("habitation_id") REFERENCES "public"."habitations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relocation_recommendations" ADD CONSTRAINT "relocation_recommendations_site_id_relocation_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."relocation_sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "regions_boundary_geom_idx" ON "regions" USING gist ("boundary_geom");--> statement-breakpoint
CREATE INDEX "habitations_point_geom_idx" ON "habitations" USING gist ("point_geom");--> statement-breakpoint
CREATE INDEX "habitations_district_idx" ON "habitations" USING btree ("district");--> statement-breakpoint
CREATE INDEX "habitations_priority_idx" ON "habitations" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "red_zones_boundary_geom_idx" ON "red_zones" USING gist ("boundary_geom");--> statement-breakpoint
CREATE INDEX "relocation_sites_point_geom_idx" ON "relocation_sites" USING gist ("point_geom");--> statement-breakpoint
CREATE INDEX "relocation_sites_district_idx" ON "relocation_sites" USING btree ("district");