import sqlite3
from flask import Flask,render_template,request,redirect,url_for,flash
from flask_sqlalchemy import SQLAlchemy


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:////Users/Mehmet Niyazi/Desktop/den/images/shopping.db'
db=SQLAlchemy
@app.route("/")
def login():
    print("hereeeee")
    return render_template("logined.html")


@app.route("/loginbutton/",methods=["POST"])
def relogin():
    print("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTPPPPPPPPPPPP")
    username = request.form.get("username")
    password = request.form.get("password")
    conn = sqlite3.connect('shopping.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user WHERE email LIKE '%s'"%username)
    dd=list(c.fetchall())
    dd=list(dd)
    print(dd)
    conn.commit()
    if dd != []:
        if len(dd)==1:
            print(dd[0][2])
            if dd[0][3]==password:
                return redirect("/aboutedpage")
            else:
                return redirect("/")
        else:
            for i in dd:
                print(i)
                print("/////////////////////////")
                if i[3]==password:
                    return redirect("/aboutedpage")
    else:
        return redirect("/")



@app.route("/created.html")
def create():
    return render_template("created.html")

@app.route("/createbutton/",methods=["POST"])
def created():
    print("nurdasın")
    conn = sqlite3.connect('shopping.db')
    c = conn.cursor()
    email = request.form.get("cemail")
    name = request.form.get("cname")
    surname = request.form.get("csurname")
    password = request.form.get("cpassword")
    conn = sqlite3.connect('shopping.db')
    
    c = conn.cursor()
    sqlite_insert_query="INSERT INTO user(username,email,password) Values('{0}','{1}','{2}')".format(name,email,password)
    print(sqlite_insert_query)
    print("YYYYYYYYYYYYYYYYYY")
    c.execute(sqlite_insert_query)
    conn.commit()
    conn.close()
    if(len(email)>0):
        return redirect("/")
    else:
        return redirect("/created.html")

@app.route("/logined.html")
def reloging():
    return render_template("logined.html")


@app.route("/aboutedpage")
def aboutpage():
    return render_template("indexe.html")


@app.route("/shoped.html")
def shop():
    return render_template("shoped.html")

@app.route("/contacted.html")
def contacted():
    return render_template("contacted.html")



if __name__=='__main__':
    app.run(debug=True)