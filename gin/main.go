package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"
	"html/template"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
  r.Delims("[[", "]]")
  r.LoadHTMLGlob("templates/*")

	styles := map[string]string{
		"dark":  "* { background-color: black; color: white; }",
		"light": "* { background-color: white; color: black; }",
	}

  r.GET("/callback", func(c *gin.Context) {
		c.HTML(http.StatusOK, "callback.html", gin.H{})
	})

  r.GET("/theme/:branding", func(c *gin.Context) {
    branding := c.Param("branding")

		if style, ok := styles[branding]; ok {
			fmt.Println(style)
			c.HTML(http.StatusOK, "index.tmpl", gin.H{
				"style": template.CSS(style),
			})
    } else {
			c.String(http.StatusNotFound, "Unknown theme")
		}
  })

	pendingJSON := gin.H{
		"status":      "pending",
		"hintCode":    "",
		"redirectUrl": nil,
		"qrData":      "",
	}
	redirectJSON := gin.H{
		"status":      "",
		"hintCode":    "",
		"redirectUrl": "/callback",
		"qrData":      "",
	}

	var someVar int64 = 0
	randomUUID := "130d3bb2-7ed8-4302-af33-aa55be8764fb"
	rand.Seed(time.Now().UnixNano())
	r.GET("/login/se-bankid/:instanceid/collect", func(c *gin.Context) {
		instanceID := c.Param("instanceid")

		randomChar := randomUUID[rand.Intn(len(randomUUID))]
		qrData := fmt.Sprintf("bankid://collect/%s%c", instanceID, randomChar)

		someVar++
		fmt.Println(someVar, someVar % 20 == 19)

		if someVar % 20 == 19 {
			response := gin.H{}
			for k, v := range redirectJSON {
				response[k] = v
			}
			response["qrData"] = qrData

			c.JSON(http.StatusOK, response)
			return
		}

		response := gin.H{}
		for k, v := range pendingJSON {
			response[k] = v
		}
		response["qrData"] = qrData

		c.JSON(http.StatusOK, response)
	})

	fmt.Println("Server running on http://0.0.0.0:3000")
	r.Run("0.0.0.0:3000")
}
