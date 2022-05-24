import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TestimonialModule } from './testimonial/testimonial.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.LOCAL_DB),
    AuthModule,
    RestaurantModule,
    UsersModule,
    ProductModule,
    TestimonialModule,
    //GuardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
