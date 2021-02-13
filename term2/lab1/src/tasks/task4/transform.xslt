<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output indent="yes" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Petmarket products</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
      </head>
      <body class="container row text-center mx-auto">
        <xsl:for-each select="root/product">
          <div class="card m-1 p-2 col-5">
            <div class="card-image">
              <img>
                <xsl:attribute name="src">
                  https://petmarket.ua<xsl:value-of select="img" />
                </xsl:attribute>
              </img>
            </div>
            <h5 class="card-title">
              <xsl:value-of select="name" />
            </h5>
            <xsl:if test="@price">
              <p class="card-text">
                <xsl:value-of select="price" />
              </p>
            </xsl:if>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
