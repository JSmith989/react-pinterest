# React Pinterest

Earlier in the school year I had created a pinterest app using firebase. This assignment was to use the same firebase data that I created but instead use react to create the project. 

## Deployed | [![Netlify Status](https://api.netlify.com/api/v1/badges/04e4c6a2-78d6-476e-8627-8a0def87d07e/deploy-status)](https://app.netlify.com/sites/notpinterest/deploys)

https://notpinterest.netlify.app/


## Features
CRUD on Pins
CRUD on Boards
Adding local images on pins and boards
Adding pin to a board
Public/Private pins
Public pins displayed on home page
Ability to search for boards or pins


## Technologies

JavaScript
Sass
React
Firebase
Bootstrap

### Screenshots
![img](https://user-images.githubusercontent.com/67443077/100302994-212f1900-2f61-11eb-9a94-251897c2efbb.png)
![img](https://user-images.githubusercontent.com/67443077/100303076-53d91180-2f61-11eb-9e31-d6a50252fdbe.png)
![img](https://user-images.githubusercontent.com/67443077/100303079-55a2d500-2f61-11eb-87b0-b7943702c39f.png)


## Code Snippet
```
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
          <BoardForm board={boards} onUpdate={this.getBoards}/>
            </AppModal>
          <h2>Your Boards</h2>
          <div className='d-flex flex-wrap container justify-content-center'>{showBoards()}</div>
          </>
        )}
      </>
```
