months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
def generateTabBar(selectedTab):
    tabBar = """
            <div id = 'tab-bar'>
            <div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/doc_icon_outline.svg' type='image/svg+xml'
                id='today-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text'>Today</div>
            </div>
            <div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/clock_icon_outline.svg' type='image/svg+xml'
                id='archive-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text'>Archive</div>
            </div>
            <div class = "tab-bar-icon-container">
                <object data="../resources/Icons/mail_icon_outline.svg" type="image/svg+xml"
                id="contact-icon" class = "tab-bar-icon"></object>
                <div class = "tab-bar-text" >Contact</div>
                <a href="mailto: lionsroar@zis.ch" style = "width:100%; height: 100%;">
                    <div class = "tab-bar-invis"></div>
                </a>
            </div>
            <div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/question_mark_icon_outline.svg' type='image/svg+xml'
                id='about-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text'>About</div>
            </div>
            <div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/magnifying_glass_icon_outline.svg' type='image/svg+xml'
                id='search-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text'>Search</div>
            </div>
        </div>"""
        
    if(selectedTab == "today"):
        tabBar.replace("doc_icon_outline.svg", "doc_icon_fill.svg")
    elif(selectedTab == "archive"):
        tabBar.replace("clock_icon_outline.svg", "clock_icon_fill.svg")
    elif(selectedTab == "about"):
        tabBar.replace("question_mark_icon_outline.svg.svg", "question_mark_icon_fill.svg.svg")

    return tabBar

def generateMainArticle(data):

    title = data['main_article_title']
    author = data['author'] if ('author' in data) else "The Lion's Roar"
    date = str(data['day'])+' '+months[data['month']-1]+' '+str(data['year'])
    thumbnail = data['main_article_thumbnail']
    url = data['main_article_url']

    mainArticle = """ 
            <article class = "main-article">
                <div id = "blurred-bg" style = 'background-image: url(""" + thumbnail + """)'> 
                    <div id="blurred-bg-overlay"></div>
                </div>

                <a href = '""" + url + """'>
                    <div class = "main-thumbnail" style = 'background-image: url(""" + thumbnail + """)'>
                    <div class = "WV-button-mobile">
                            <img class = "WV-button-mobile-play-icon" src="resources/Icons/video_icon_fill_black.svg">
                            <p class = "WV-button-mobile-text">Weekly Video</p>
                        </div>
                    </div>
                </a>
                <div class = "main-article-desc">
                    <div style = "margin-right: 2vw">
                        <h2 class="article-title main-article-title">""" + title + """</h2>
                        <h3 class="article-author main-article-author">""" + author + """   •   """ + date + """</h3>
                    </div>
                    <div class = "main-article-desktop-button-container">
                        <a href = '""" + url + """'>
                            <div class = "WV-button-desktop">
                                <img class = "WV-button-desktop-play-icon" src="resources/Icons/video_icon_fill_black.svg">
                                <p class = "WV-button-desktop-text">Weekly Video</p>
                            </div>
                        </a>
                        <div class = "share-button-desktop-container" onclick = "share(null, null, this)">
                            <img class = "main-article-share-button-desktop" src="resources/Icons/share_icon_outline_black_no_circle.svg">
                        </div>
                    </div>
                    <img class = "main-article-share-button" onclick = "share(null, null, this)" src="resources/Icons/share_icon_outline.svg">
                </div>
            </article>
            """
    return mainArticle

def generateArticles(articles):
    output = ""
    a3Counter = 0
    a3InnerHTML = ""
    for art in articles:
        articleTitle = str(art['title'])
        articleAuthor = str(art['author'])
        articleDate = str(art['date'])
        articleThumbnail = str(art['thumbnail'])
        articleURL = str(art['url'])
        articleType = str(art['type'])
        articleDisplayType = str(art.get('display_type', "3"))

        if(articleDisplayType == "1"): # thumbnail with bottom text
            article1 = """
                <article class = "article1">
                    <a href = " """+ articleURL +""" ">
                    <div id = "blurred-bg" style = 'background-image: url(""" + articleThumbnail + """)'> 
                        <div id="blurred-bg-overlay"></div>
                    </div>
                    <div class = "article1-thumbnail" style = 'background-image: url(""" + articleThumbnail + """)'></div>
                    </a>

                    <a href = " """+ articleURL +""" ">
                    <section class="article1-description-mobile">
                        <div class="article1-title">"""+ articleTitle +"""</div>
                        <div class="article1-author">"""+ articleAuthor + """</div>
                        <div class="article1-date">"""+ articleDate +"""</div>
                    </section>
                    <section class="article1-description-desktop">
                        <div class="article1-title">"""+ articleTitle +"""</div>
                        <div class="article1-author">"""+ articleAuthor +"""  •  """+ articleDate +"""</div>
                    </section>
                    </a>

                    <img class = "article1-share-button" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                    <img class = "article1-share-button-desktop" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                </article>
                """
            output += article1
        elif (articleDisplayType == "2"): # Splash image with short title
            article2 = """
                <article class = "article2">
                    <a href = " """+ articleURL +""" ">
                    <div class = "article2-thumbnail" style = 'background-image: url(""" + articleThumbnail + """)'></div>
                    <h2 class="article2-title">""" + articleTitle + """</h2>
                    </a>
                    <img class = "article1-share-button" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                    <img class = "article1-share-button-desktop" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                </article>
            """
            output += article2
        elif (articleDisplayType == "3"):
            a3Counter += 1 #increment
            temp = """
                <article class = "article3-article">
                    <a href = " """+ articleURL +""" ">
                        <div class = "article3-desc">
                            <h2 class="article3-title">""" + articleTitle + """</h2>
                            <h3 class="article3-author">"""+ articleAuthor +"""  •  """+ articleDate +"""</h3>
                        </div>
                    </a>
                    <img class = "article3-share-button" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                </article>
            """
            a3InnerHTML += temp
            if a3Counter >= 3:
                article3 = """<article class = "article3">"""
                article3 += a3InnerHTML
                article3 += "</article>"
                output += article3
                a3Counter = 0
                a3InnerHTML = ""
    if a3Counter != 0:
        article3 = """<article class = "article3">"""
        article3 += a3InnerHTML
        article3 += "</article>"
        output += article3
    return output

def generatePublicationPageContent(data):

    # htmlPage = """<html> 
    #                 <head>
    #                     <title>The Lion's Roar</title>
    #                     <link rel="stylesheet" href="https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/08a83dc7a1f81cd5567ed6dd75db4a9af77373ef/NEW_UI/n.css">
    #                     <link rel="stylesheet" href="https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/NEW_UI/tab-bar.css">
    #                     <link rel="stylesheet" href="https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/NEW_UI/articletypes.css">
    #                     <link rel="stylesheet" href="https://use.typekit.net/dpx3mbp.css">
    #                     <script src="https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/NEW_UI/n.js"></script>
    #                     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    #                 </head>
    #                 <body>
    #             """

    htmlPage = """
        <html> 
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                <title>The Lion's Roar</title>
                <link rel="stylesheet" href="https://use.typekit.net/dpx3mbp.css">
    """

    r = requests.get('https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/08a83dc7a1f81cd5567ed6dd75db4a9af77373ef/NEW_UI/n.css')
    htmlPage += '<style>'+r.text+'</style>'
    r = requests.get('https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/NEW_UI/tab-bar.css')
    htmlPage += '<style>'+r.text+'</style>'
    r = requests.get('https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/NEW_UI/articletypes.css')
    htmlPage += '<style>'+r.text+'</style>'
    r = requests.get('https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/NEW_UI/n.js')
    htmlPage += '<script>'+r.text+'</script>'





    tabBar = generateTabBar("today");
    
    htmlPage += tabBar

    pageContent = """
        <section id = "pageContent">
        """
    mainArticle = generateMainArticle(data)
    pageContent += mainArticle

    pageContent += """<div class = "articles-container">"""

    articles = generateArticles(data['articles']) #get articles from the data
    pageContent += articles

    pageContent += """
            </div>
        </section> 
    """
    htmlPage += pageContent

    htmlPage += """
                    </body>
                </html>
                """

    return htmlPage
    


def generateArchivePageContent(data, isSearch = False):
    pageContent = ""
    # default archive page
    if not isSearch:
        for publication in data:
            pub = """
                <div class = "archive-result">
                    <div class = "archive-thumbnail" style = "background-image: url(' """ + publication["main_article_thumbnail"] + """')"></div>
                    <div class = "archive-desc">
                        <h2 class = "archive-date">"""+ publication["date"] + """</h2>
                        <h3 class = "archive-title">"""+ publication["main_article_title"] + """</h3>
                    </div>
                    <object class = "arrow-icon" data="../resources/Icons/arrow_right_icon.svg" type="image/svg+xml"></object>
                <a href='""" + publication["main_article_url"] + """'><div class = "invis"></div></a>
                </div>
            """
            pageContent += pub
    else: # there is a query
        for result in data:
            # add a text element to the timeline with an id attribute that correlates
            #     with its corresponding article, that way we have an onclick function
            #     that passes itself as a parameter. The function gets the id, checks the
            #     html page for a article with that same id, and scrolls to it.
            pageContent += """
                div class = "archive-result">
                   <div class = "archive-thumbnail" style = "background-image: url(' """ + result["main_article_thumbnail"] + """'></div>
                   <div class = "archive-desc">
                       <div class = "result-title">""" + result["title"] + """</div>
                       <div class = "result-desc">"""+ result["date"] +"""  •  """+ result["author"] +"""</div>
                   </div>
                   <object class = "arrow-icon" data="../resources/Icons/arrow_right_icon.svg" type="image/svg+xml"></object>
                   <a href='"""+ result["url"] +"""'><div class = "invis"></div></a>  
                /div>
            """

    return pageContent
        


if __name__ == "__main__":
    import webbrowser
    import requests
    import json
    import os
    import time
    r = requests.get("https://raw.githubusercontent.com/2canupea/Lions-Roar-Site-Data/main/data.json")
    data = json.loads(r.text)
    with open('output.html', 'w') as f:
        f.write(generatePublicationPageContent(data[6])) #TODO: set this back to data[0]
    path = os.path.abspath('output.html')
    print(path)
    #webbrowser.open_new_tab('file://' + path)
    time.sleep(0.1)