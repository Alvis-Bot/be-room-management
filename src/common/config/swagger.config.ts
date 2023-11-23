import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export class SwaggerConfig {
	static init(app: INestApplication) {
		const options = new DocumentBuilder()
			.setTitle("Room Management API")
			.setDescription("Room Management API description")
			.setVersion("1.0")
			.addBearerAuth(
				{ type: "http", scheme: "bearer", bearerFormat: "JWT" },
				"Authorization",
			)
			.addSecurityRequirements("Authorization")
			.build();
		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup("api", app, document);
	}
}
