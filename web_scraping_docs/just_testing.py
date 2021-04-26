from requests_html import HTMLSession
import re
import random



def get_product_info(url):
    s = HTMLSession()
    r = s.get(url)
    r.html.render(sleep=3, timeout=300)

    print("url", url)

    title = ""
    price = ""
    category=""
    description = ""
    rating = ""
    num_of_ratings = ""
    image_1 = ""

    # Title Grab
    try:
        title = r.html.xpath('//*[@id="productTitle"]', first=True).text
        print("title", title)

    except:
        title = "Very cool Product"

    # Price Grab
    try:
        price = (r.html.xpath('//*[@id="priceblock_dealprice"]', first=True).text)
        print("price",price)

    except:
        try:
            price = (r.html.xpath('//*[@id="priceblock_ourprice"]', first=True).text)
            print("price",price)
        except:
            try:
                price = (r.html.xpath('//*[@id="price"]', first=True).text)
                print("price",price)
            except:
                price = "13.98"

    if len(price) > 8:
        price = "42.99"

    # Category Grab
    try:
        categories = ["Kitchen and Dining", (r.html.find(".subnav-home", first=True).text)];
        print("categories",categories)

    except:
        categories = ["Kitchen and Dining", "miscellaneous"]
    
    # Description Grab
    
    try:
        description_raw = r.html.xpath('//*[@id="feature-bullets"]', first=True).text
        print("description_raw",description_raw)

    except:
        try:
            description_raw = r.html.xpath('//*[@id="productDescription"]', first=True).text
            print("description_raw",description_raw)

        except:
            description_raw = "This is a really cool product"

    description = re.sub(r'''[^A-Za-z.!? "':-]''', '', description_raw)

    # Condition Create
    
    conditions = ["New", "Open box", "Certified refurbished", "Seller refurbished", "Used", "Very poor"]
    condition = random.choice(conditions)
    
    # Rating Grab
    
    try:
        rating = r.html.xpath('//*[@id="acrPopover"]', first=True).text
        print("rating",rating)
    except:
        rating = "4 out of 5 stars"

    # Number of Ratings Grab

    # try:
    #     num_of_ratings = r.html.xpath('//*[@id="acrCustomerReviewText"]', first=True).text[0],
    #     print("num_of_ratings", num_of_ratings)

    # except:
    #     num_of_ratings = "333"

    num_of_ratings = random.randrange(9999)

    # Image Grab
    
    try:
        imageHtmlInfo = (r.html.find("#landingImage", first=True));
        image_1 = imageHtmlInfo.attrs["src"]
    except:
        image_1 = "https://secure.touchnet.com/C20243_ustores/web/images/product-default-image.png"


    product = {
        'title': title,
        'price': price,
        'categories': categories,
        'description': description,
        'condition': condition,
        'rating': rating,
        'num_of_ratings': num_of_ratings,
        'image_1': image_1,

    }

    print("PRODUCT CREATED!!!!!!!!!", product)

get_product_info('https://www.amazon.com/Purina-Fancy-Feast-Grilled-Gravy/dp/B0012KGZYM/ref=zg_bs_pet-supplies_4?_encoding=UTF8&psc=1&refRID=MXM0GKM8GJ0310QX0B0Y')