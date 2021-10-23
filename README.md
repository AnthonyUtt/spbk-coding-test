# Junk Tracker 3000

You have been hired to build an inventory management system for your local junkyard! While they accept may different items, old vehicles are their most valuable, so they want to keep better track of all the different ones they have.

## Tasks

1. Allow for four different vehicle types (listed below) to be created and edited.
    - For each Vehicle type, only display the relevant fields to the user
      - For example: If a a Coupe is being created/edited, do not show the "Automatic sliding doors" field.
2. After each vehicle is created, register it using the `VehicleRegistrationService` (at [`lib/vehicleRegistrationService.js`](lib/vehicleRegistrationService.js)) and permanently associate that registration ID with the vehicle.
3. List all vehicles on `http://localhost:3000/` with their type, nickname, mileage rating and registration ID
    - mileage rating is defined as:
        - low: mileage < 10,000
        - medium: 10,000 <= mileage < 100,000
        - high: 100,000 <= mileage

### Vehicle Types

- Sedan
    - Nickname: string
    - Mileage: integer
    - Wheels: 0-4, default: 4
    - Doors: 0-4, default: 4
    - Engine status: works, fixable, junk, default: works
- Coupe
    - Nickname: string
    - Mileage: integer
    - Wheels: 0-4, default: 4
    - Doors: 0-2, default: 2
    - Engine status: works, fixable, junk, default: works
- Mini-Van
    - Nickname: string
    - Mileage: integer
    - Wheels: 0-4, default: 4
    - Doors: 0-4, default: 4
      - For each door: (**Tip**: Make sure everything else is working before addressing this)
        - Sliding: boolean, default: false 
    - Engine status: works, fixable, junk, default: works
- Motorcycle
    - Nickname: string
    - Mileage: integer
    - Wheels: 0-2, default: 2
    - Engine status: works, fixable, junk, default: works
    - Seat status: works, fixable, junk, default: works

## Guildelines

**Please don't spend more than two (2) hours on this project!**

The goal is not to add every bell, whistle, feature and optimization that you can think of. The goal is to both see an example of working code that you write and see how you do implementing realistic (albeit contrived...) features. 

You will be judged on how accurately you complete the above tasks and the quality of the code you write. 

The Express server already has some stubbed RESTful endpoints generated for a Vehicle API resource as an example. You are free to make any and all changes you'd like to complete the assignment.

## Getting Started

See [`SETUP.md`](SETUP.md) for instructions on how to get your development envrionment working. If you have any questions, especially regarding setup, please contact us so we can get it sorted out ASAP!

When you are finished, push all changes to the repo on GitHub and email us that you've finished! Feel free to to open a pull request or leave any other comments on specific commits or the repo as you see fit.

## Notes

- If you have any issues at all, especially with getting your development environment working, please reach out to us ASAP. Our intention isn't to make you troubleshoot an existing project's configuration. (You wouldn't spend the majority of your work day doing that in real life). We are more than happy to do that for you!
- Make your first priority getting everything to work! Save the bonus points for after you get things working all the way through.
- Do not worry about server-side rendering of any JavaScript React components
- Add any additional npm modules or other tools you'd like
- This project was boostrapped using [Create React App](https://create-react-app.dev/). See [CREATE_REACT_APP_README.md](CREATE_REACT_APP_README.md) for more info on some of the scaffolding.