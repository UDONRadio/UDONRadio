import React from 'react';
import { Grid, Image, Modal } from 'semantic-ui-react'


const AboutView = (props) => (
  <div id="about-view" style={{ height: '100%', width: '100%'}}>
  <Grid textAlign="justified">
    <Grid.Row>
      <Grid.Column width={16}>
        <p className="texte" id="texte_moins">"Les udon (うどん/饂飩, udon?) sont, avec les soba, les pâtes les plus consommées au Japon. Elles sont préparées avec de la farine de blé tendre (froment). Ce sont les pâtes japonaises les plus épaisses : de 2 à 4 mm de largeur. Leur couleur varie de blanc à blanc cassé et leur consistance est molle et élastique."</p>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={13}>
        <p className="texte">UDON, c'est aussi une petite webradio collaborative, tout juste débarquée au pays des Internets. Constituée d'une bande de potes curieux et amoureux de musiques en tous genres, UDON Radio s'est construite autour d'un projet simple: partager et faire découvrir nos goûts musicaux. C'est tout. La plateforme n'en est pour l'instant qu'à sa génèse: mais jeunesse oblige, nous sommes tout de même pétris d'ambition pour notre petite radio.</p>
      </Grid.Column>
      <Grid.Column width={3}>
        <Modal dimmer={'blurring'} trigger={<Image id="image_trigger_modal" src='/udon_instantane.jpg' />} closeIcon>
          <Modal.Content>
            <Image style={{ height: '100%', width: '100%'}} wrapped size='medium' src='/udon_instantane.jpg' />
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={16}>
        <p className="texte">Au-delà de la "simple" aspiration à produire du contenu varié (emissions, sessions live, sets, etc...), UDON chérit un concept en particulier. Celui d'une radio collaborative pour tous: à laquelle <b>tout le monde</b> puisse participer.</p>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <Modal dimmer={'blurring'} trigger={<Image id="image_trigger_modal" src='/udon_cuphead.jpg' />} closeIcon>
          <Modal.Content>
            <Image style={{ height: '100%', width: '100%'}} wrapped size='medium' src='/udon_cuphead.jpg' />
          </Modal.Content>
        </Modal>
      </Grid.Column>
      <Grid.Column width={13}>
				<p className="texte">Pour faire simple: <b>notre</b> UDON a l'ambition de devenir <b>votre</b> radio. Cet objectif, même simplement formulé, reste une tâche compliquée à accomplir. Aussi, si parmi vous qui lisez ces lignes, certains pensent pouvoir nous apporter de l'aide (pour construire le site par exemple 😉), n'hésitez pas! Envoyez au choix un mail à cette adresse: <a href="mailto:contact@udonradio.fr">contact@udonradio.fr</a></p>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={13}>
        <p className="texte" id="texte_plus">Ah, et UDON diffuse 24h/24, 7 jours sur 7. Chez nous on bosse bénévolement dans une asso à but non lucratif : nique la pub !</p>
        <p className="texte" id="texte_plus">Longue vie aux grosses nouilles!</p>
      </Grid.Column>
    </Grid.Row>
  </Grid>

  </div>
);

export default AboutView;
