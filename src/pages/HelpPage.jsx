// src/pages/HelpPage.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Link as MUILink
} from "@mui/material";
import {
  Search as SearchIcon,
  VideoLibrary as VideoLibraryIcon,
  Chat as ChatIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Accessibility as AccessibilityIcon,
  Info as InfoIcon,
  LocationOn as LocationOnIcon,
  SupportAgent as SupportAgentIcon,
  TrackChanges as TrackChangesIcon,
  Eco as EcoIcon,
  Article as ArticleIcon,
  Update as UpdateIcon,
  Cookie as CookieIcon
} from "@mui/icons-material";
export default function HelpPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Hilfe & Support für Mobility APP
      </Typography>

      <Grid container spacing={4}>
        {/* Hilfe & Support */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <SupportAgentIcon sx={{ mr: 1 }} /> Hilfe & Support
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><SearchIcon /></ListItemIcon>
                  <ListItemText primary="Bedienungsanleitung finden" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SearchIcon /></ListItemIcon>
                  <ListItemText primary="Support Suche" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VideoLibraryIcon /></ListItemIcon>
                  <ListItemText primary="Hilfe-Videos" />
                </ListItem>
                <ListItem>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Bedienungsanleitung herunterladen (PDF)
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Kontakt zum Service */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <ChatIcon sx={{ mr: 1 }} /> Kontakt zum Service
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><ChatIcon /></ListItemIcon>
                  <ListItemText primary="Live-Chat (24/7 verfügbar)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><WhatsAppIcon /></ListItemIcon>
                  <ListItemText primary="WhatsApp: +49 123 456789" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PhoneIcon /></ListItemIcon>
                  <ListItemText primary="Hotline: 0800 1234567" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PhoneIcon /></ListItemIcon>
                  <ListItemText primary="Rückruf anfordern" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><AccessibilityIcon /></ListItemIcon>
                  <ListItemText primary="Gebärdensprache-Service" />
                </ListItem>
                <ListItem>
                  <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                    Rückruf anfordern
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Aix Mobility Account */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <InfoIcon sx={{ mr: 1 }} /> Aix Mobility Account
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Account erstellen und verwalten" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Passwort zurücksetzen" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Profil-Einstellungen anpassen" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><LocationOnIcon /></ListItemIcon>
                  <ListItemText
                    primary="Service-Center finden"
                    secondary="Standorte in Ihrer Nähe"
                  />
                </ListItem>
                <ListItem>
                  <Button
                    component={RouterLink}
                    to="/support"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Service-Center suchen
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Lösungen & Beratung */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <SupportAgentIcon sx={{ mr: 1 }} /> Lösungen & Beratung
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Häufige Probleme und Lösungen" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Produktberatung" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><TrackChangesIcon /></ListItemIcon>
                  <ListItemText primary="Serviceticket verfolgen" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><EcoIcon /></ListItemIcon>
                  <ListItemText
                    primary="EU-Vorgaben E-Medien und 0% Emission"
                    secondary="Umweltrichtlinien und Compliance"
                  />
                </ListItem>
                <ListItem>
                  <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                    Ticket-Status prüfen
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* News & Updates */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <UpdateIcon sx={{ mr: 1 }} /> News & Updates
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Aktuelle News & Hinweise"
                    secondary="Neueste Informationen zur Mobility-App"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><UpdateIcon /></ListItemIcon>
                  <ListItemText primary="Software-Updates (Mobility)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><UpdateIcon /></ListItemIcon>
                  <ListItemText primary="Software-Updates (Mility)" />
                </ListItem>
                <ListItem>
                  <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                    Update-Historie anzeigen
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Rechtliches */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <ArticleIcon sx={{ mr: 1 }} /> Rechtliches
              </Typography>
              <List>
                <ListItem>
                  <MUILink component={RouterLink} to="/datenschutz" underline="hover">
                    <ListItemText primary="Datenschutzerklärung" />
                  </MUILink>
                </ListItem>
                <ListItem>
                  <MUILink component={RouterLink} to="/agb" underline="hover">
                    <ListItemText primary="Allgemeine Geschäftsbedingungen (AGB)" />
                  </MUILink>
                </ListItem>
                <ListItem>
                  <MUILink component={RouterLink} to="/impressum" underline="hover">
                    <ListItemText primary="Impressum" />
                  </MUILink>
                </ListItem>
                <ListItem>
                  <ListItemIcon><CookieIcon /></ListItemIcon>
                  <MUILink component={RouterLink} to="/cookies" underline="hover">
                    <ListItemText primary="Cookie-Einstellungen" />
                  </MUILink>
                </ListItem>
                <ListItem>
                  <Button
                    component={RouterLink}
                    to="/support"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Rechtliche Dokumente herunterladen
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* FAQ Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Häufig gestellte Fragen (FAQ)
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Wie resette ich mein Passwort?"
              secondary="Gehen Sie zu 'Aix Mobility Account' > 'Passwort zurücksetzen'"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Wo finde ich die aktuelle Bedienungsanleitung?"
              secondary="Unter 'Hilfe & Support' > 'Bedienungsanleitung finden'"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Wie verfolge ich mein Serviceticket?"
              secondary="Unter 'Lösungen & Beratung' > 'Serviceticket verfolgen'"
            />
          </ListItem>
        </List>
      </Box>

      {/* Support Contact Bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          display: "flex",
          justifyContent: "space-around",
          zIndex: 1000
        }}
      >
        <Button variant="contained" color="secondary" startIcon={<ChatIcon />}>
          Live-Chat starten
        </Button>
        <Button variant="contained" color="secondary" startIcon={<PhoneIcon />}>
          Hotline anrufen
        </Button>
        <Button variant="contained" color="secondary" startIcon={<WhatsAppIcon />}>
          WhatsApp Kontakt
        </Button>
      </Box>
    </Box>
  );
}
