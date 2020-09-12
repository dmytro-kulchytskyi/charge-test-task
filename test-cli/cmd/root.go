package cmd

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/tkanos/gonfig"
	"github.com/urfave/cli/v2"
)

//Configuration interface
type Configuration struct {
	Host string
}

//Execute function
func Execute() {
	app := &cli.App{
		Name:  "charge",
		Usage: "cli test task",
		Commands: []*cli.Command{
			{
				Name:    "post",
				Aliases: []string{"p"},
				Usage:   "make a post request",
				Subcommands: []*cli.Command{
					{
						Name:  "organizations",
						Usage: "make a post request",
						Flags: []cli.Flag{
							&cli.StringFlag{
								Name:  "authorization",
								Value: "",
								Usage: "API KEY ",
							},
							&cli.PathFlag{
								Name:  "body",
								Value: "",
								Usage: "path to body.json",
							},
							&cli.StringFlag{
								Name:  "data",
								Value: "full",
								Usage: "data format",
							},
						},
						Action: apiRequest,
					},
				},
			},
		},
	}

	app.Run(os.Args)
}

func apiRequest(c *cli.Context) error {
	configuration := Configuration{}
	err := gonfig.GetConf("config.json", &configuration)
	if err != nil {
		panic(err)
	}

	authorization := c.String("authorization")
	body := c.Path("body")
	dataType := c.String("data")

	if len(strings.TrimSpace(authorization)) == 0 {
		fmt.Println("authorization param required!")
		return nil
	}

	if len(strings.TrimSpace(body)) == 0 {
		fmt.Println("body param required!")
		return nil
	}

	if _, err := os.Stat(body); os.IsNotExist(err) {
		fmt.Println("unable to open file!")
		return nil
	}

	file, _ := os.Open(body)
	defer file.Close()

	host := configuration.Host
	url := host + "/organizations?data=" + dataType
	fmt.Println(url)

	req, err := http.NewRequest("POST", url, file)
	if err != nil {
		panic(err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Api-Key "+authorization)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("unable to connect to server!")
		return nil
	}
	defer resp.Body.Close()

	fmt.Println(resp.Status)
	return nil
}
