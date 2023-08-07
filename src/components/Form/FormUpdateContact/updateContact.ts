import styled from "styled-components";

const StyledFormUpdateContact = styled.form`
  width: 95%;
  margin: 0 auto;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  display: flex;

  .boxButton {
    display: flex;
    justify-content: space-between;

    .btnEditingTech,
    .btnRemoveTech {
      cursor: pointer;
      padding: 0 1rem;
      width: 45%;
    }

    .btnRemoveTech {
      background-color: var(--color-grey-200);
    }
  }
`;

export default StyledFormUpdateContact;
