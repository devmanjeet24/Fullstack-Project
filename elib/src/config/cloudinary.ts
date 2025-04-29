import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';



    // Configuration
    cloudinary.config({ 
        cloud_name: config.CloudinaryCloud, 
        api_key: config.CloudinaryApiKey, 
        api_secret: config.CloudinaryApiSecret
    });

    export default cloudinary;
    
    
  
