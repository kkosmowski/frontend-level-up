class HttpService {
  constructor() {
    this.headers = {
      "x-rapidapi-host": "asos2.p.rapidapi.com",
      "x-rapidapi-key": "dfa047907cmsh91de42f4af99e72p1b601ejsnc690c9ca50f2"
    }
  }

  get(url) {
    return fetch(url,
      {
        method: 'GET',
        headers: this.headers,
      }
    ).then(response => response.json());
  }
}

export default HttpService;
