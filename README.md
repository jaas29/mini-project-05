# JAS Movies

A movie browsing web application built with React and Vite. Browse, search, filter, and manage your personal movie lists by logging in or signing up for an account with JAS Movies — then download them as PDFs.

---

## Live Link
 - jasmoviess.netlify.app 


## Team Members

- Sebastian Rodriguez
- Jose Araya
- Annika Maringer

---

## Features

- **Movie Catalog** — Displays a grid of movies loaded from a local JSON file, each showing the poster, title, director, IMDB rating (as stars), genre, year, age rating, and language.
- **Search** — Filter movies by title or director name in real time.
- **Filters** — Narrow results by genre, age group (G, PG, PG-13, R, NC-17), and release year.
- **Sorting** — Sort movies by year (newest/oldest), IMDB rating (high/low), or title (A→Z / Z→A).
- **Watchlist** — Add or remove movies from a personal Watchlist using the heart icon on each card. The list persists across page reloads via `localStorage`.
- **Already Watched** — Mark movies as watched using the eye icon. Also persists via `localStorage`.
- **PDF Download** — Download either list (Watchlist or Already Watched) as a formatted PDF file directly from the side drawer.
- **Pagination** — Movies are displayed 12 per page. Filters and sorting reset to page 1 automatically.
- **Toast Notifications** — Feedback messages appear when adding/removing movies or when no results match the current filters.
- **Loading Screen** — An animated loader is shown for at least 2 seconds while movie data is being fetched.
- **Responsive Design** — Layout adapts from 1 to 4 columns depending on screen size.
- **Login** - Login to an account to save movies in a wishlist or watchlist
- **SignUp** - Signup page to create an account with our page for personalized user experience
- **Authentication** - both SignUp and Login use an authentication application to verify a user
- **Not Found** -  Error codes for pages that do not exist or are wrong 
- **MainRouter** - Routes/Links to other pages 
- **PrivateRoute** - Private Route to a page that needs to be unlocked through a login or signup authentication
- 

---

## How It Works

1. On Load the User gets send to the Home Page that shows the top rated movies and asks the User to Login or create an account to be able to save movies in watchlist or wishlist
2. Login/SignUp requires the User to either fill out your data to create and account or if an account already exists to use the correct email and password to get access to your profile
4. On load, the app fetches movie data from `/public/movie.json`.
2. The `SearchBar` component provides a text input and four dropdowns (genre, age group, year, sort order).
3. Filtering and sorting are computed with `useMemo` so the UI stays responsive.
4. Each `MovieCard` shows the movie poster as a background image with a gradient overlay. Hovering reveals the short description, runtime, and budget.
5. Clicking the heart button toggles a movie in the **Watchlist**; clicking the eye button toggles it in **Already Watched**.
6. Both lists are accessible via the icons in the **Navbar**. Each opens a side drawer listing the saved movies with a Remove button and a Download List button.
7. The Download button uses `@react-pdf/renderer` to generate and download a PDF with the movie title, year, genre, IMDB rating, and runtime for each entry.
8. There are pages like about and watch that are unauthorized for the user or are not available which show an error code
---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mini-project-05

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Top bar with Watchlist and Watched drawers, PDF download
│   ├── MovieCard.jsx     # Individual movie card with poster, rating, and action buttons
│   ├── SearchBar.jsx     # Search input and filter/sort dropdowns
│   ├── Pagination.jsx    # Page navigation controls
│   ├── DownloadList.jsx  # PDF document template
│   ├── Loader.jsx        # Loading animation
│   └── Footer.jsx        # Footer with links and social icons
├── App.jsx               # Root component — state management and layout
├── main.jsx              # React entry point
└── index.css             # Global styles
│
├───contexts
│       AuthContext.jsx    # authentication file
│
├───firebase
│       firebase.config.js  # firebase configuration file
│
├───layouts
│       Root.jsx            # find root layouts here
│
├───Pages
│       Dashboard.jsx       # dashboard only accessible through login or sign up
│       Home.jsx            # homepage that everyone sees
│       LogIn.jsx           # Login Form
│       NotFound.jsx        # Error message page
│       SignUp.jsx          # SignUp Form
│       Unauthorized.jsx    # Unauthorized error code  page
│
└───routes
        MainRouter.jsx      # Page that sets the routes/ paths
        PrivateRoute.jsx    # Protects routes that require authentication.
public/
└── movie.json            # Movie dataset
```

---

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DaisyUI Documentation](https://daisyui.com/)
- [Styled Components Documentation](https://styled-components.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [@react-pdf/renderer](https://react-pdf.org/)
- [Claude by Anthropic](https://claude.ai) — used to assist with Git and GitHub workflows
- [UIverse](https://uiverse.io/LightAndy1/tidy-pig-67)
- [UIverse](https://uiverse.io/Uncannypotato69/ancient-hound-67)
- [ReactPDF](https://react-pdf.org/) - help for the download pdf part
- [Firebase](https://firebase.google.com/)- for the authentication
