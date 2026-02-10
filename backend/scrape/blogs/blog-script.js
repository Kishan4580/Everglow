const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { v2: cloudinary } = require('cloudinary');
const { log } = require('console');
require('dotenv').config({ path: '../../config/.env' });

cloudinary.config({
    cloud_name: 'everglow-web-app-cloud',
    api_key: process.env.CloudinaryAPI_Key,
    api_secret: process.env.CloudinaryAPI_Secret
});
const productsDir = './html_blogs';
async function parseBlogs() {
    const files = fs.readdirSync(productsDir);
    const blogs = [];

    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const html = fs.readFileSync(path.join(productsDir, file), 'utf-8');
        const $ = cheerio.load(html);
        const productname = $('h1.wp-block-post-title').text().trim().replace(/\s+/g, ' ');

        log("Processing blog: ", productname);
        const author = $('p.wp-block-post-author__name').text().trim();
        const date = $('time').attr('datetime');
        const avatarUrl = $('img.avatar').attr('src');
        const coverImage = $('img.attachment-post-thumbnail').attr('src');
        let uploadedCover;
        const content = [];
        // Upload to Cloudinary (optional)
        try {
        uploadedCover = await cloudinary.uploader.upload(coverImage, {
            folder: 'blogs',
            public_id: `${productname.replace(/\s+/g, '_')}_cover`
        });
        // Now extract blog content
        const blocks = $('div.wp-block-post-content').children();
        blocks.each(async (i, el) => {
            const tag = $(el).prop('tagName')?.toLowerCase();
            if (tag === 'h3' || tag === 'h4') {
                content.push({
                    type: 'heading',
                  data : { level: tag,
                    text: $(el).text().trim()}
                });
            } else if (tag === 'p') {
                content.push({
                    type: 'paragraph',
                    data: $(el).text().trim()
                });
            } else if (tag === 'ul' || tag === 'ol') {
                const items = [];
                $(el)
                    .find('li')
                    .each((i, li) => items.push($(li).text().trim()));
                content.push({
                    type: 'list',
                    data : {style: tag === 'ul' ? 'unordered' : 'ordered',
                    items}
                });
            } else if (tag === 'figure' || tag === 'img') {
                 $(el).find('img').each(async(i, img) => {
                    const imgSrc = $(img).attr('src');
                    const alt = $(img).attr('alt');
                    console.log(alt);
                    
                    if(imgSrc) {
                        try {
                            // Upload to Cloudinary with unique name using index
                            const uploadedCorrImages = await cloudinary.uploader.upload(imgSrc, {
                                folder: 'blogs',
                                public_id: `${productname.replace(/\s+/g, '_')}_blog_image_${i}`
                            });

                            content.push({
                                type: 'image',
                                data : { src: uploadedCorrImages.secure_url,
                                alt: alt || 'Blog Image'
                                }
                            });
                        } catch(error) {
                            console.log(`Error uploading image ${imgSrc}:`, error);
                        }
                    }
                });
            }
        });
        } catch (error) {
            console.log("Error to upload the image to cloudinary ", error);
            
        }
        const slugify = (title) => {
            return title.toLowerCase().replace(/\s+/g, '_');
        }
        // 
        let categories = ['haircare', 'moisturizers', 'cleansers', 'bodycare'];
        
        let tags = ['masks', 'skincare', 'lotion', 'bodycare'];
        
        blogs.push({
            title: productname,
            slug: slugify(productname),
            categories,
            tags,
            author,
            date,
            // avatarUrl,
            coverImage: uploadedCover?.secure_url,
            content
        });
    }
    // Write to JSON only after ALL files are processed
      fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
      console.log('All blogs stored in blogs.json');

    // console.log(JSON.stringify(blogs, null, 2));
}

parseBlogs();
