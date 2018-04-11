
# IPA Server
This node server will let you distribute your iOS IPA file to anyone over-the-air (on the internet). It includes a Basic authentication scheme that you can customize so just authorized people can actually download it.

It is really simple to use. After the initial configuration, all you need to do is run your server, archive your project and paste the build files inside the server. Please read the detailed steps bellow:

# Initial configuration
> I recommend you to use **ngrok** if you don't own a server with HTTPS on the web. More details bellow.
> You will need **node** and **npm** for running the server

### 1. Clone repo
```$ git clone https://github.com/Edudjr/IPAServer```
### 2. Setup IPA Server
##### 2.1 Install packages
```$ npm install```
##### 2.2 (optional) Change username and password
If you want to change the default username and password (admin:admin), open the file **/app.js** and
modify the following lines:
```
//Change the login and password to fit your needs
let login = 'admin';
let password = 'admin';
```

##### 2.3 Update release file with your host  

> Before reading any further, you should decide if you are going to use a web server or ngrok to access your IPA Server. If you choose ngrok, please read the optional **Ngrok configuration** step now.

Inside the file **/views/releases.ejs** you should change the following line:
```
<a href="itms-services://?action=download-manifest&url=https://<%= login %>:<%= password %>@HOST-HERE/build/manifest.plist">Install App</a> <br>
```
Modify just the **HOST-HERE** part. e.g:
```
<a href="itms-services://?action=download-manifest&url=https://<%= login %>:<%= password %>@df444895.ngrok.io/build/manifest.plist">Install App</a> <br>
```

# Serving the IPA file
First, you need to archive your project, click on Export and
choose the "Development" option for distribution
![](https://s19.postimg.cc/6m8tlmesz/Captura_de_Tela_2018-01-30_a_s_09.23.44.png)

Make sure to tick the "Include manifest for over-the-air installation"
![](https://s19.postimg.cc/kfx6b1x83/Captura_de_Tela_2018-01-30_a_s_09.28.02.png)

You should provide your ipa and 2 images like the image bellow.
![](https://s19.postimg.cc/odkg009mb/Captura_de_Tela_2018-01-30_a_s_09.38.03.png)

> The portion "admin:admin" is the username and password from app.js, used for accessing
the files in /build. You can change it in the code.

Finally, sign your App (using manual or automatic signing) and Click on **Export**
This will generate a bunch of files. Copy and paste then to the **build** folder

Now you just need to access **https://HOST/release** from the device browser, sign in and download the IPA from the link.

> ps: when you click the link, nothing will pop in the screen, but the app will show up in the home screen

### Enjoy!

# Ngrok Configuration (optional)
Using the terminal, navigate to the Ngrok installation folder and then enter: ```./ngrok http 3000```
You should see something like this:
![](https://s19.postimg.cc/byxo015cz/Captura_de_Tela_2018-01-30_a_s_09.46.44.png)
In this case, your host is ***https://df444895.ngrok.io***
