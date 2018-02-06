## Untappd Menu Board Displays

Render untappd menu data into a html web page that can be displayed on a 65" 4K displayed

Node app will grab data for each location from API for each request store's page request route. 
/downtown will load downtown data. 
/uptown will load uptown data. etc

start with auth request to grab locations list or hard code if location ids do not change. 

use request module and JS promises instead of loop. Use location id in rquest to grab the list of published menus.
So you will need to use this request to loop through menus and grab ids for published menus and save menu ids to varibles.
Then in next promise use menu ids to gather section ids for each menu. 

Then use promise to gather items from each section. 


layout variables in template:

hidden data:
location: id
menu: id 
section: id (use menu id reference to assign section to correct menu)
item: id
unpublished: (true or false)

Visible data: 
Name: 
Menus: only show published menu name or dedicate one menu to display board
Sections: list section by name and description
items {
  item id: 
  position:
  untappd id:
  label image:
  brewery location
  abv:
  ibu:
  name: 
  style: 
}
top beers: you can also think about showing top beers as a scroll along bottom of page. 

