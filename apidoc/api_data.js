define({ "api": [
  {
    "type": "delete",
    "url": "/:id",
    "title": "Delete Images",
    "name": "DeleteImages",
    "group": "Images",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Images unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>delete message response</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_time",
            "description": "<p>delete time.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n       \"message\": \"successfully deleted\",\n       \"date_time\": 1418626576195\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/:id/custom/:width",
    "title": "Get images File Fix Width",
    "name": "GetImagesFile",
    "group": "Images",
    "version": "1.0.0",
    "description": "<p>Request images File Fix Width Auto Height</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Images unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>value</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Images",
            "optional": false,
            "field": "Images",
            "description": "<p>File</p> "
          }
        ]
      }
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/:id/custom/:width/:height",
    "title": "Get images Custom",
    "name": "GetImagesFileCustom",
    "group": "Images",
    "version": "1.0.0",
    "description": "<p>Request images File Custom</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Images unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width value param width = auto for auto width</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height value</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Images",
            "optional": false,
            "field": "Images",
            "description": "<p>File</p> "
          }
        ]
      }
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/:id/info",
    "title": "Get images information",
    "name": "GetImagesInfo",
    "group": "Images",
    "version": "1.0.0",
    "description": "<p>Request images information</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Images unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id Images unique ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "base64data",
            "description": "<p>Images encode base64</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "create_date",
            "description": "<p>timestamp create images</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "image_info",
            "description": "<p>Images data (example for an Object)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_info.type",
            "description": "<p>Images type</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "image_info.dimensions",
            "description": "<p>Images dimensions data</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images_info.dimensions.width",
            "description": "<p>Images Width</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images_info.dimensions.height",
            "description": "<p>Images Height</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n     \"__v\": 0,\n     \"base64data\": \" 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\",\n     \"create_date\": \"1418704580210\",\n     \"_id\": \"548fb6c4eb5bd1b7046ba330\",\n     \"image_info\": {\n          \"type\": \"jpg\",\n     \"dimensions\": {\n          \"width\": 720,\n          \"height\": 480\n    }",
          "type": "JSON"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/list",
    "title": "Get images List",
    "name": "GetImagesList",
    "group": "Images",
    "version": "1.0.0",
    "description": "<p>Request images List default pages = 1 , limit = 10</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "page_count",
            "description": "<p>page count results</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>data list object</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>images file name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.create_date",
            "description": "<p>timestamp create images</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.image_info",
            "description": "<p>Images data (example for an Object)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.image_info.type",
            "description": "<p>Images type</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.image_info.dimensions",
            "description": "<p>Images dimensions data</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.images_info.dimensions.width",
            "description": "<p>Images Width</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.images_info.dimensions.height",
            "description": "<p>Images Height</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "next",
            "description": "<p>link next</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prev",
            "description": "<p>link prev</p> "
          }
        ]
      }
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/list/:pages/:limit",
    "title": "Get images List Custom",
    "name": "GetImagesListCustom",
    "group": "Images",
    "version": "1.0.0",
    "description": "<p>Request images List Custom pages limit</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pages",
            "description": "<p>pages item.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "items",
            "description": "<p>per page.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "page_count",
            "description": "<p>page count results</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>data list object</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>images file name</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.create_date",
            "description": "<p>timestamp create images</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.image_info",
            "description": "<p>Images data (example for an Object)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.image_info.type",
            "description": "<p>Images type</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.image_info.dimensions",
            "description": "<p>Images dimensions data</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.images_info.dimensions.width",
            "description": "<p>Images Width</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.images_info.dimensions.height",
            "description": "<p>Images Height</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "next",
            "description": "<p>link next</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prev",
            "description": "<p>link prev</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"page_count\": 10\n } ,\n {\n \"data\":\n {\n     \"_id\": \"548e6c1128a8b689031794d4\",\n     \"name\": \"kapp9yMJbxqS5UWudDltOkuSZ6kQD2yU.jpg\",\n     \"create_date\": \"1418619921738\",\n     \"image_info\": {\n     \"type\": \"jpg\",\n     \"dimensions\": {\n         \"width\": 720,\n         \"height\": 480,\n         }\n     }\n },{\n     \"next\": \"http://localhost:3000/list/2/2\"\n }, {\n     \"prev\": \"http://localhost:3000/list/0/2\"\n }",
          "type": "JSON"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Get images File",
    "name": "GetImagesOrignal",
    "group": "Images",
    "version": "1.0.0",
    "description": "<p>Request images File Orignal</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Images unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Images",
            "optional": false,
            "field": "Images",
            "description": "<p>File</p> "
          }
        ]
      }
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  },
  {
    "type": "post",
    "url": "/",
    "title": "Upload Images",
    "name": "UploadImages",
    "group": "Images",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "images",
            "description": "<p>Base64 encode ( array )</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id Images unique ID</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "base64data",
            "description": "<p>Images encode base64</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "create_date",
            "description": "<p>timestamp create images</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "image_info",
            "description": "<p>Images data (example for an Object)</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image_info.type",
            "description": "<p>Images type</p> "
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "image_info.dimensions",
            "description": "<p>Images dimensions data</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images_info.dimensions.width",
            "description": "<p>Images Width</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images_info.dimensions.height",
            "description": "<p>Images Height</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n     \"__v\": 0,\n     \"base64data\": \" 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\",\n     \"create_date\": \"1418704580210\",\n     \"_id\": \"548fb6c4eb5bd1b7046ba330\",\n     \"image_info\": {\n          \"type\": \"jpg\",\n     \"dimensions\": {\n          \"width\": 720,\n          \"height\": 480\n    }",
          "type": "JSON"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Images"
  }
] });