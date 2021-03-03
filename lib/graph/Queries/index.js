export const AllPeople = /* GraphQL */ `
  query {
    allPeople {
      id
      name
      image
      gender
      birthYear
    }
  }
`

export const Character = /* GraphQL */ `
  query($id: ID!) {
    person(id: $id) {
      id
      name
      image
      gender
      birthYear
      eyeColor
      height
      mass
      skinColor
      homeworld {
        id
        name
      }
      starships {
        id
        name
        model
      }
      vehicles {
        id
        name
        model
      }
      species {
        id
        name
      }
      films {
        id
        title
        episodeID
      }
    }
  }
`
