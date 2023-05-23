# ContentGen by PromptChainer

ContentGen is a React application built using Next.js that uses [PromptChainer](https://promptchainer.io/)'s API to generate an article and more content based on user input. 
This powerful tool is perfect for generating articles using AI and you can create it in a matter of minutes!

Read more in our [Blog Post](https://blog.promptchainer.io/p/use-case-custom-built-article-writer).

## 🌟 Features

- React.js & Next.js application.
- Integration with the PromptChain API.
- Dynamic rendering of the generated output.
- Adaptive textarea input for keywords.
- Loading state with randomized sentences.

## 🚀 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed (>= 14.x)
- NPM or Yarn as package manager
- An API key from [PromptChain](https://promptchainer.io/) - in this Beta version it's on us :) Don't worry about it

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PromptChainer/showcase-article-gen
```
Install NPM packages:
```bash
npm install
```
Or if you are using Yarn:
```bash
yarn
```
Copy the .env.example file and create a .env file in the root of the project. Add your PromptChain API key to the .env file:
```bash
NEXT_PUBLIC_API_KEY=your_api_key_here
```
If you want to add Google Analytics, add your measurment ID the .env file:
```bash
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_measurment_id_here
```
Start the development server:
```bash
npm run dev
```
Or if you are using Yarn:
```bash
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

## 📚 Usage

After you've started the application, you will find four text inputs:

1. **Subject**: The main topic of the article.
2. **Keywords**: Important words that should be included in the article.
3. **Target Audience**: The primary readers or viewers that the article will be targeting.
4. **Personal Notes**: Any additional instructions or guidelines for the content.

After filling in the desired fields, click on the 'Generate' button and the marvelous content will be created and displayed on the right side of the application.

## 🔖 Components

The React components written:
- **Textarea**: This is a dynamic textarea component. It resizes based on input, handles placeholder, value, onChange events, and provides optional rows and columns properties.

## 💼 Contributing

Pull requests, suggestions and improvemnts are welcome!

## 📝 License

Distributed under the MIT License. See LICENSE for more information.

## 📫 Contact

Email: support@promptchainer.io