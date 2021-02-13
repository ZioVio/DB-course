import { XMLToXHTML } from './../../utils/xml-to-xhtml';
export const run = async (xml: string): Promise<void> => {
  const xhtml = await XMLToXHTML(`
  <?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet type="text/xsl" href="catalog.xslt"?>
<catalog>
    <computer name="Toshiba Lightning">
        <brand>Toshiba</brand>
        <model>ZK3TAQ</model>
        <processor cores="2">Intel i7 3360QM</processor>
        <memory type="DDR3">4GB RAM</memory>
        <storage type="HDD">500GB</storage>
    </computer>
    <computer name="HP Envy dv7">
        <brand>HP</brand>
        <model>Envy dv7-7390eb</model>
        <processor cores="4">Intel i7 4700MQ</processor>
        <memory type="DDR3">16GB RAM</memory>
        <storage type="HDD">2TB</storage>
    </computer>
    <computer name="Samsung R720 Multimedia PC">
        <brand>Samsung</brand>
        <model>R720</model>
        <processor cores="2">Intel Core 2 Duo @2.53Ghz</processor>
        <memory type="DDR3">4GB RAM</memory>
        <storage type="HDD">256GB</storage>
    </computer>
</catalog>
`, `<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output
        indent="yes"
        doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
		<title>Computer catalog</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cedricvb.be/wp-content/pages/xslt/catalog.css" />
            </head>
            <body class="container">
                <h1 class="well"><i class="glyphicon glyphicon-list"></i>Computer catalog</h1>
                <div class="list-group">
                    <xsl:for-each select="catalog/computer">
                        <div class="list-group-item">
                            <h2><i class="glyphicon glyphicon-shopping-cart"></i><xsl:value-of select="@name"/></h2>
                            <div class="computer">
                                <xsl:if test="brand">
                                    <div class="brand">
                                        <strong>Brand</strong>
                                        <span><xsl:value-of select="brand"/></span>
                                    </div>
                                </xsl:if>
                                <xsl:if test="model">
                                    <div class="model">
                                        <strong>Model</strong>
                                        <span><xsl:value-of select="model"/></span>
                                    </div>
                                </xsl:if>
                                <xsl:if test="processor">
                                    <div class="processor">
                                        <strong>Processor</strong>
                                        <span><xsl:value-of select="processor"/></span>
                                    </div>
                                </xsl:if>
                                <xsl:if test="memory">
                                    <div class="memory">
                                        <strong>Memory</strong>
                                        <span><xsl:value-of select="memory"/></span>
                                    </div>
                                </xsl:if>
                                <xsl:if test="storage">
                                    <div class="storage">
                                        <strong>Storage</strong>
                                        <span><xsl:value-of select="storage"/></span>
                                    </div>
                                </xsl:if>
                            </div>
                        </div>
                    </xsl:for-each>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
`);

  console.log('xhtml:', xhtml)
};
