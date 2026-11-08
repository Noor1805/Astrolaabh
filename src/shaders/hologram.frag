uniform float uTime;
uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float fresnel = dot(viewDir, vNormal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 2.5);

  // Scanline effect
  float scanline = sin(vPosition.y * 30.0 - uTime * 4.0) * 0.5 + 0.5;

  vec3 finalColor = uColor * (fresnel + scanline * 0.2);
  float alpha = fresnel * 0.8 + 0.1;

  gl_FragColor = vec4(finalColor, alpha);
}
