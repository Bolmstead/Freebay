from requests_html import HTMLSession
import re
import random
import pdb

base_url = 'https://www.amazon.com'

url_list = []
product_list = []

# Grabs each displayed product's link URL and appends the link to url_list
def get_urls(url):
    s = HTMLSession()
    r = s.get(url)
    r.html.render(sleep=1, timeout=30)

    products_shown = r.html.xpath('//*[@id="zg-ordered-list"]', first=True)
    print("products_shown",products_shown)

    urls_rough = products_shown.xpath('//*[@class="a-link-normal"]')
    print("urls_rough")

    for i in urls_rough:
        href_link = i.attrs['href']
        entire_link = base_url+href_link
        if (("product-reviews" not in entire_link) and ("/www.amazon.comhttps://www.amazon" not in entire_link)):
            url_list.append(entire_link)

    
    print("url_list", url_list)



# Execute get_urls
get_urls('https://www.amazon.com/portal-migration/bestsellers/wireless?_encoding=UTF8&ie=UTF8&ref_=zg_bs_nav_0')


# Grabs title, price, description, rating, num_of_ratings, and image from an individual product URL
# Creates a product object then appends to product_list list
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

    description = re.sub(r'''[^A-Za-z.!? "'-]''', '', description_raw)
    
    # Image grab
    try:
        imageHtmlInfo = (r.html.find("#landingImage", first=True));
        image_1 = imageHtmlInfo.attrs["src"]
    except:
        image_1 = "https://www.amazon.com/Best-Sellers/zgbs/wireless/ref=zg_bs_nav_0"


    product = {
        'title': title,
        'price': price,
        'categories': categories,
        'description': description,
        'image_1': image_1,

    }

    print("PRODUCT CREATED!!!!!!!!!", product)

    product_list.append(product)




# For each product link in list, run get_product_info
for link in url_list:
    get_product_info(link)

print("PRODUCT LIST CREATED################################", product_list)


