// src/components/MapControls.jsx
import React from "react";
import { Box, Paper, IconButton, Tooltip, Divider, Typography } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LayersIcon from "@mui/icons-material/Layers";

/**
 * Reusable Map control buttons.
 * Pass in callbacks from your map component.
 *
 * Props:
 * - onZoomIn, onZoomOut, onFitAll: () => void
 * - onLocate?: () => void        // optional (Geolocate)
 * - onToggleLayer?: () => void   // optional (Basemap switch)
 * - layerName?: string           // optional label for current layer
 * - vertical?: boolean           // default true
 * - sx?: object                  // extra Box styles
 */
export default function MapControls({
  onZoomIn,
  onZoomOut,
  onFitAll,
  onLocate,
  onToggleLayer,
  layerName,
  vertical = true,
  sx = {},
}) {
  const isHorizontal = !vertical;

  const DividerEl = (
    <Divider
      orientation={vertical ? "horizontal" : "vertical"}
      flexItem
      sx={{ opacity: 0.6 }}
    />
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1000,
        ...sx,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          alignItems: "center",
          borderRadius: 2,
          overflow: "hidden",
          backdropFilter: "blur(6px)",
        }}
      >
        <Tooltip title="Zoom In">
          <IconButton aria-label="zoom in" onClick={onZoomIn} size="small">
            <ZoomInIcon />
          </IconButton>
        </Tooltip>

        {DividerEl}

        <Tooltip title="Zoom Out">
          <IconButton aria-label="zoom out" onClick={onZoomOut} size="small">
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>

        {DividerEl}

        <Tooltip title="Alle einpassen">
          <IconButton aria-label="fit all" onClick={onFitAll} size="small">
            <ZoomOutMapIcon />
          </IconButton>
        </Tooltip>

        {onLocate && (
          <>
            {DividerEl}
            <Tooltip title="Aktuelle Position">
              <IconButton aria-label="locate" onClick={onLocate} size="small">
                <MyLocationIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        {onToggleLayer && (
          <>
            {DividerEl}
            <Tooltip title="Kartenlayer wechseln">
              <IconButton aria-label="toggle layer" onClick={onToggleLayer} size="small">
                <LayersIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Paper>

      {layerName && (
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "block",
            textAlign: isHorizontal ? "left" : "center",
            color: "text.secondary",
            px: 0.5,
          }}
        >
          Layer: {layerName}
        </Typography>
      )}
    </Box>
  );
}
