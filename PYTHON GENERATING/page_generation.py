def generateTabBar(selectedTab):
    tabBar = """
            <div id = 'tab-bar'>
            <div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/doc_icon_fill.svg' type='image/svg+xml'
                id='today-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text'>Today</div>
            </div>
            <div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/clock_icon_outline.svg' type='image/svg+xml'
                id='archive-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text'>Archive</div>
            </div>
            <a href='mailto: lionsroar@zis.ch' style = 'width:100%; height: 100%;'><div class = 'tab-bar-icon-container'>
                <object data='resources/Icons/mail_icon_outline.svg' type='image/svg+xml'
                id='contact-icon' class = 'tab-bar-icon'></object>
                <div class = 'tab-bar-text' >Contact</div>
            </div></a>
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
    return tabBar

def generateMainArticle(data):

    title = data['title']
    author = data['author'] if 'author' in data else "The Lion's Roar"
    date = data['date']
    thumbnail = data['thumbnail']
    url = data['url']

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
    for art in articles:
        articleTitle = art['title']
        articleAuthor = art['author']
        articleDate = art['date']
        articleThumbnail = art['thumbnail']
        articleURL = art['url']
        articleType = art['type']

        a3Counter = 0
        a3InnerHTML = ""

        if(articleType == "1"): # thumbnail with bottom text
            article1 = """
                <article class = "article1">
                    <a href = '"""+ articleURL +"""'>
                    <div id = "blurred-bg" style = 'background-image: url(""" + articleThumbnail + """)'> 
                        <div id="blurred-bg-overlay"></div>
                    </div>
                    <div class = "article1-thumbnail" style = 'background-image: url(""" + articleThumbnail + """)'></div>
                    <section class="article1-description-mobile">
                        <h2 class="article-title">"""+ articleTitle +"""</h2>
                        <h3 class="article-author">"""+ articleAuthor + """</h3>
                        <h3 class="article-date">"""+ articleDate +"""</h3>
                    </section>
                    <section class="article1-description-desktop">
                        <h2 class="article-title">"""+ articleTitle +"""</h2>
                        <h3 class="article-author">"""+ articleAuthor +"""  •  """+ articleDate +"""</h3>
                    </section>
                    </a>

                    <img class = "article1-share-button" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                    <img class = "article1-share-button-desktop" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                </article>
                """
            output += article1
        elif (articleType == "2"): # Splash image with short title
            article2 = """
                <article class = "article2">
                    <a href = '"""+ articleURL +"""'>
                    <div class = "article2-thumbnail" style = 'background-image: url(""" + articleThumbnail + """)'></div>
                    <h2 class="article2-title">""" + articleTitle + """</h2>
                    </a>
                    <img class = "article1-share-button" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                    <img class = "article1-share-button-desktop" onclick = "share(null, null, this)" src="resources/Icons/share_icon_fill.svg">
                </article>
            """
            output += article2
        elif (articleType == "3"):
            a3Counter += 1; #increment
            temp = """
                <article class = "article3-article">
                    <a href = '"""+ articleURL +"""'>
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
    if a3Counter != 0:
        article3 = """<article class = "article3">"""
        article3 += a3InnerHTML
        article3 += "</article>"
        output += article3
    return output

def generatePublicationPageContent(data):
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
    return pageContent
    

with open('output.html', 'w') as f:
    f.write(generatePublicationPageContent(""))