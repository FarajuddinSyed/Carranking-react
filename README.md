### A React app to rank your Top 3 Favourite Cars

### Code Explanation

You can view a live demo of my implementation by clicking [Car Rankings](https://carrankings-syedfarajuddin.netlify.app/) 

The first thing that came to my mind when I thought of the designing a top 3 ranking site was, how would I want this site to look if I was a user because the main thing that a Web Developer creating websites and applications must know is to not just look from the perspective of the Business Logic but also try thinking from the perspective of a usual user to implement the design, UI, easy to use functionality and realistic expectations in such a way that would attract more users to the page and enhance traffic.

The best part is, no CSS library was ever used and the entire app UI is written with Pure CSS.

So, I hope you read ahead to understand how I implemented my logic.

## Header

I wanted to use an appealing color for the the look and feel, the first basic color a user could find appealing. Not too shiny or glittery, but beautiful in appearance, smooth in UI and easy for the user's eyes and mind to process.

So, I used Pacifico font for the title in the header and applied CSS styling and box shadow to the header.

## Login

Since, this would be the first page, a user would be seeing, I wanted to give it my best to make an impression. Using the lorem food image auto resizable, randomly generated placeholder image api link that was mentioned in the project requirements for the Home page, I asked myself why not try testing that link with a Full resolution image and a Mobile resolution image. It worked and I chose to go ahead to use it as the background. Furthermore, I made this whole page responsive and viewable on mobile devices too.

I also added a beautiful Custom Animated Logo Loading design that loads for 3 seconds and a beautiful easeinout animation.

Further, as mentioned in the requirements that since there is no backend given and the person implementing this problem i.e. Me should be using a static user db file given to validate user details and implement login. I ensured that no fields are left blank and that the login page doesn't submit and load details if the fields are blank or if the username or password is invalid and an error is shown.

I also ensured that the username is saved in the localStorage to give that feel of persistance of data as long as the user is logged in. More information as to why, comes next.

I also ensured that if a user wants to still create a new account to use the features, he can do so by clicking the register text link that appears below the login button.

## Register

If a user does not have an account, and wants to create an account, to use the features of this amazing application, they can do so at this page which also validates if an account with the same username exists, if both password and confirm password fields match, if, a user is already logged in etc and if the above conditions do not match and the details the user has entered are entirely new, then it creates a new account on the localStorage, persists the new logged in username and automatically logs in and grants access to the features and functionality of the app as long as the user remains logged in.

## Home page

The most interesting implementation is the Home page. As the problem statement requires two tabs, one displaying user cards containing the title, description and an option to add rank to this button, the other displaying the selected data.

I wrote a very detailed Javascript logic about this page starting with the Car Brand cards and a button that adds a rank to the Car Brand card selected by the user which dynamically changes its color and badge based on the order of selection and resets it back to add on clicking again, all with the help of states and that the selected Car Brand and the order of ranking and rating are shown and updated based on these actions on the selection tab.

I also ensured that no Car with the same name is selected twice.

Ensured responsiveness of the page, functionality and tabs across Mobile and PC devices

I also ensured with the help of an active state that maintains the car names selected that ensures:

1. That not more than 3 items are selected
2. An animation is shown in the Selection display tab when no item is selected
3. Once 3 items are selected and displayed on the selection tab, a ribbon is shown asking user if they want to view poll results, clicking which they can submit their selection.

Also the selected ranks are stored in local storage in order to persist the changes to selection, even on page refresh and as long as the user is logged in.

I also added a Star Icon on the top right side of the header that's gray normally when less than 3 elements are selected, which can also be clicked to view the already existing rankings on the ranking page, and when 3 elements are selected, it starts glowing and can also be clicked to submit the poll results.

Also, the fun part is that if a user is not logged in, they will not be able to add ranks on the card at all or view the ranking page and it will show them a snackbar containing the error message asking them to login in order to rank their top 3 Cares.

Also a conditional login button appears in the header if not logged in, in order to access the login page, else if logged in, a hoverable user profile icon is shown on hovering which a greeting is shown along with the users name and an option to log out.

Clicking logout will also remove all data from the local storage in order for the new logged in user to be able to store his data on the local storage. Remember, we wouldn't have done the clearing the stored data on logout if it was actually on a working backend server but, since this is just a demo, we are using the browser local storage in order to persist data even on refresh.

Also theres, a free search bar that helps in freely searching across data based on title or based on keywords in the description that match the query. Else a specific not found animation is also shown to indicate that no Car Brands were found.

Also, I implemented error handling to display animations and snackbars with the appropriate error messages if in case of an error.

## Ranking page


I created a smooth and beautiful layout that displays an animation in case no selection is submitted to ranking page from the previous page else it is displayed in the most beautiful hoverable, scalable designed card layout.

I also implemented the swap functionality that helps the user to swap their existing rankings. Also, I also added a reset button that clears the rankings for the user on the page if the user is not satisfied with his selection. Plus, the buttons are fancy in appearance too, because I used Pacifico font again for the Button text.

Also rankings are dynamically updated on submission of top 3 Car Brands everytime from the home page even if the user has not reset the rankings on the rankings page.

Also, the data is persisted into local storage even on refresh for as long as the user is logged in.

Also, the layout is so responsive that it is beautifully displayed across all devices.

## Footer

Lastly, the footer appears at the bottom of all 4 pages and is given the theme color of a variant of green I had chosen at the start and contains an attribution of my name.

So, I really hope that you really liked my explanation for this code as well as were able to view the code on this Github repository.

You can view a live demo of my implementation by clicking [Car Rankings](https://carrankings-syedfarajuddin.netlify.app/) 

You can also view more of my projects on my [GitHub](https://github.com/SyedFarajuddin/) profile and on my Linked in with live demo links.
[LinkedIn](https://www.linkedin.com/in/syedfarajuddin/)
