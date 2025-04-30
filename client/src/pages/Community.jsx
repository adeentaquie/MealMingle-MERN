// Community.jsx
import styled from "styled-components";
...
const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Highlight = styled.span`
  color: #e67e22;
`;

const Main = styled.main`
  padding: 2rem;
`;

const Perks = styled.ul`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const PerkCard = styled.li`
  list-style: none;
  text-align: center;
`;

function CommunityPage() {
  return (
    <>
      <Header>
        <h1>
          One shared passion: <Highlight>Food</Highlight>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </Header>
      <Main>
        <h2>Community Perks</h2>
        <Perks>
          <PerkCard>
            <img src={mealIcon} alt="A delicious meal" />
            <p>Share & discover recipes</p>
          </PerkCard>
          <PerkCard>
            <img src={communityIcon} alt="A crowd of people, cooking" />
            <p>Find new friends & like-minded people</p>
          </PerkCard>
          <PerkCard>
            <img src={eventsIcon} alt="A crowd at a cooking event" />
            <p>Participate in exclusive events</p>
          </PerkCard>
        </Perks>
      </Main>
    </>
  );
}
