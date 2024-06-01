<img src="https://raw.githubusercontent.com/A58-Agents-Team1/Motion.Mate/main/src/assets/logo.png" width="100" height="100">

## Motion.Mate

Fitness tracking application, where users can track their daily exercises, such as steps taken, runs (time and distance), or other activities. Users can set their daily/weekly/monthly goals and track their progress.

**Languages:** <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" height="20"> <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" height="20">

**Frameworks/Libraries:** <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" height="20"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="20"> <img src="https://media.licdn.com/dms/image/D4E12AQE1NInvgAfR3Q/article-cover_image-shrink_423_752/0/1696488544540?e=1722470400&v=beta&t=B6ngRnuqG90ia7gPvOs2Wnjk7o8NlWQe3rOVhKAq6a0" height="25"> <img src="https://img.daisyui.com/images/daisyui-logo/daisyui-logotype.svg" height="20">

**Linters:** <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" height="20">

**Databases:** <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" height="20">

**Browsers:** <img src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white" height="20">

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fstart.png?alt=media&token=ee8cc2b3-1a61-4519-9f96-59177216b4d6&_gl=1*t5p8co*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc4MDEzLjAuMC4w"  width="30" height="30"> Getting Started

To install and run the project, follow these steps:

1. Clone the [Motion Mate _gitlab repository_](https://github.com/A58-Agents-Team1/Motion.Mate) locally:

```bash
git clone https://github.com/A58-Agents-Team1/Motion.Mate.git
```

2. Navigate to the project directory:

```bash
cd Motion.Mate
```

3. Install project dependencies:

```bash
npm install
```

4. To run the project, use the following command:

```bash
npm run dev
```

5. Open localhost link in browser to view web-platform.

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fdatabase.png?alt=media&token=958f4c41-6532-4e07-a31d-e437ebe00527&_gl=1*o97b6d*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTQ0LjAuMC4w"  width="30" height="30"> Database Scheme (Structure)

### Users document:

```js
users: {
  username: {
    username: <string>,
    email: <string>,
    phoneNumber: <number>,
    avatar: <string>,
    createdOn: <number>,
    age: <number>,
    firstName: <string>,
    lastName: <string>,
    height: <number>,
    weight: <number>,
    isBlocked: <boolean>,
    userRole: <string>,
    uid: <string>,
    friends: { <object> (optional)
      username: <boolean>,
      ...
    },
    requests: { <object> (optional)
      username: <boolean>,
      ...
    },
    myRequests: { <object> (optional)
      username: <boolean>,
      ...
    },
    myGoals: { <object> (optional)
      uid: {
        name: <string>,
        owner: <string>,
        progress: <number>,
        timePeriod: {
          from: <number>,
          to: <number>,
        }
      }
      ...
    },
  }
  ...
}

```

### Categories document:

```js
categories: {
  category: {
        uid: {
         description: <string>
          imageUrl: <string>
        }
      ...
  }
  ...
}

```

### Exercises document:

```js

```

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Ffaq.png?alt=media&token=12b5c59f-8faf-4cba-98f4-b6cd9329b78b&_gl=1*9f9cxq*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTYxLjAuMC4w"  width="30" height="30"> Frequently Asked Questions

- **How can I create a profile on Motion Mate?**
  - To create a profile you simply need to click **`Register`** on the top left of the navigation menu and navigate to the **`Sign Up`** page from there. Choose a username, enter your email address and telephone number, create a password, and you're done! You will then have a page with additional information about you. You can add more information now or skip it and add it later.
- **What can I do on Motion Mate?**
  - Motion Mate is to those who are dedicated to a healthy lifestyle and seek to better themselves! You can create and assemble workout routines, which can present you with a huge amount of effective exercises. You can browse other users and add them as friends from the `All Users`.
- **User Interaction and Admin Roles?**

  -**Normal User Actions**

  - Sending Friend Requests: You can search for and send friend requests to other users. This allows you to expand your network and connect with others who share similar interests.
  - Canceling Friend Requests: If you change your mind after sending a friend request, you have the option to cancel it before the recipient responds. This gives you control over your outgoing friend requests.
  - Managing Friend List: Once a friend request is accepted, the user is added to your friend list. You can view all your friends in one place. If you no longer wish to be friends with someone, you can remove them from your friend list at any time.

  -**Admin Actions**

  - To become an admin, you can contact us through the `Contact Us` section. As an admin, you gain additional privileges and responsibilities that allow you to manage and moderate the app effectively. These include:
  - Blocking Users: You have the authority to block users who violate the app's policies or engage in inappropriate behavior. This helps maintain a safe and respectful community.
  - Assigning Admin Roles: You can grant admin privileges to other users, empowering them to assist with moderation and management tasks across the platform.
  - Deleting Users: You have the ability to delete users from the app if necessary, ensuring that the community remains secure and free from harmful activities.
  - Moderating Content: You can moderate content related to Goals and Exercises, ensuring that all posts adhere to the app's guidelines and standards. This helps maintain the quality and relevance of the content shared on the platform.

- **How can i calculate my Body Mass Index?**
  - When you go to the BMI page, you can choose between the metric or imperial system. Enter your weight and height, click 'Calculate,' and see your BMI.

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fcommunity.png?alt=media&token=893ecd6f-908b-4c1e-9223-25d82f1bb8b1&_gl=1*watnuy*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTI1LjAuMC4w"  width="30" height="30"> Community and Contributions

The `Motion Mate` platform is developed by **Team 1** (Tihomir Denev, Radoslav Marinov and Tanya Jecheva).
