import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export default function AuthScreen({
  language = 'es',
  onToggleLanguage,
  dark = false,
  onToggleTheme,
}) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const es = language === 'es';

  const colors = dark
    ? {
        background: '#211622',
        surface: '#302131',
        text: '#FFF0F8',
        muted: '#D0B9CB',
        border: '#59415A',
        input: '#251B2B',
        soft: '#493047',
        placeholder: '#B9A3B8',
      }
    : {
        background: '#FFF8FC',
        surface: '#FFFFFF',
        text: '#542443',
        muted: '#887482',
        border: '#F0D9E8',
        input: '#FFFAFD',
        soft: '#FBEAF3',
        placeholder: '#A58D9B',
      };

  const t = {
    eyebrow: es ? 'BELLEZA A TU MANERA' : 'BEAUTY, YOUR WAY',
    description: es
      ? 'Descubre nuevas formas de expresarte con recomendaciones inspiradas en tu estilo y tu estado de ánimo.'
      : 'Discover new ways to express yourself with recommendations inspired by your style and mood.',
    welcome: es ? 'Bienvenida a tu espacio' : 'Welcome to your space',
    title: es ? 'Tu próximo look empieza aquí.' : 'Your next look starts here.',
    intro: es
      ? 'Accede a tu colección personal de belleza.'
      : 'Access your personal beauty collection.',
    login: es ? 'Iniciar sesión' : 'Sign in',
    register: es ? 'Crear cuenta' : 'Create account',
    name: es ? 'Tu nombre' : 'Your name',
    email: es ? 'Correo electrónico' : 'Email address',
    password: es ? 'Contraseña' : 'Password',
    submit: busy
      ? (es ? 'Un momento...' : 'Please wait...')
      : mode === 'login'
        ? (es ? 'Entrar a MOODÉ ↗' : 'Enter MOODÉ ↗')
        : (es ? 'Crear mi cuenta ♡' : 'Create my account ♡'),
    switchLogin: es
      ? '¿Ya tienes cuenta? Inicia sesión'
      : 'Already registered? Sign in',
    switchRegister: es
      ? '¿No tienes cuenta? Regístrate'
      : 'No account yet? Create one',
    missing: es
      ? 'Completa todos los campos.'
      : 'Please complete all fields.',
    invalid: es
      ? 'Escribe un correo válido y una contraseña de al menos 6 caracteres.'
      : 'Enter a valid email and a password of at least 6 characters.',
    success: es ? 'Cuenta creada' : 'Account created',
    confirmation: es
      ? 'Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.'
      : 'Check your email to confirm your account before signing in.',
    error: es
      ? 'No se pudo completar la operación'
      : 'The operation could not be completed',
    privacy: es
      ? 'Tu espacio personal. Tus preferencias. Tu estilo.'
      : 'Your personal space. Your preferences. Your style.',
    features: es
      ? ['TU ESTILO', 'TUS LOOKS', 'TU MOOD']
      : ['YOUR STYLE', 'YOUR LOOKS', 'YOUR MOOD'],
  };

  async function handleSubmit() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim() || (mode === 'register' && !name.trim())) {
      Alert.alert('MOODÉ', t.missing);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || password.length < 6) {
      Alert.alert('MOODÉ', t.invalid);
      return;
    }

    setBusy(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { display_name: name.trim() },
          },
        });

        if (error) throw error;

        if (!data.session) {
          Alert.alert(t.success, t.confirmation);
          setMode('login');
          setPassword('');
        }
      }
    } catch (error) {
      Alert.alert(t.error, error.message || 'Error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={dark
          ? ['#382239', '#292033', '#211622']
          : ['#FFE0EF', '#FFF4FA', '#EEE5FF']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={s.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={s.topActions}>
            <Pressable
              onPress={onToggleTheme}
              style={[s.actionButton, {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }]}
            >
              <Text style={[s.actionText, { color: colors.text }]}>
                {dark ? '☀' : '☾'}
              </Text>
            </Pressable>

            <Pressable
              onPress={onToggleLanguage}
              style={[s.actionButton, {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }]}
            >
              <Text style={[s.actionText, { color: colors.text }]}>
                {es ? 'EN' : 'ES'}
              </Text>
            </Pressable>
          </View>

          <View style={s.hero}>
            <Text style={[s.brand, { color: colors.text }]}>
              MOODÉ<Text style={s.brandAccent}>.</Text>
            </Text>

            <Text style={s.brandCaption}>BEAUTY · CARE · YOU</Text>

            <Text style={s.eyebrow}>{t.eyebrow}</Text>

            <Text style={[s.heroTitle, { color: colors.text }]}>
              {t.title}
            </Text>

            <Text style={[s.heroDescription, { color: colors.muted }]}>
              {t.description}
            </Text>

            <View style={s.features}>
              {t.features.map((feature) => (
                <View
                  key={feature}
                  style={[s.feature, {
                    backgroundColor: dark ? '#FFFFFF12' : '#FFFFFFA8',
                    borderColor: dark ? '#FFFFFF25' : '#FFFFFFC9',
                  }]}
                >
                  <Text style={[s.featureText, { color: colors.text }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[s.card, {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }]}>
            <Text style={s.welcome}>{t.welcome}</Text>

            <Text style={[s.cardTitle, { color: colors.text }]}>
              {t.login}
              {mode === 'register' ? ` / ${t.register}` : ''}
            </Text>

            <Text style={[s.intro, { color: colors.muted }]}>
              {t.intro}
            </Text>

            <View style={[s.switch, { backgroundColor: colors.soft }]}>
              <Pressable
                onPress={() => setMode('login')}
                style={[s.switchButton, mode === 'login' && s.active]}
              >
                <Text style={[
                  s.switchText,
                  { color: mode === 'login' ? '#FFFFFF' : colors.muted },
                ]}>
                  {t.login}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setMode('register')}
                style={[s.switchButton, mode === 'register' && s.active]}
              >
                <Text style={[
                  s.switchText,
                  { color: mode === 'register' ? '#FFFFFF' : colors.muted },
                ]}>
                  {t.register}
                </Text>
              </Pressable>
            </View>

            {mode === 'register' && (
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t.name}
                placeholderTextColor={colors.placeholder}
                autoCapitalize="words"
                style={[s.input, {
                  color: colors.text,
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                }]}
              />
            )}

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={t.email}
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={[s.input, {
                color: colors.text,
                backgroundColor: colors.input,
                borderColor: colors.border,
              }]}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder={t.password}
              placeholderTextColor={colors.placeholder}
              secureTextEntry
              autoCapitalize="none"
              style={[s.input, {
                color: colors.text,
                backgroundColor: colors.input,
                borderColor: colors.border,
              }]}
            />

            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={handleSubmit}
              style={[s.submit, busy && s.disabled]}
            >
              <LinearGradient
                colors={['#E84491', '#BC5ACB', '#9173E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={s.submitGradient}
              >
                {busy
                  ? <ActivityIndicator color="#FFFFFF" />
                  : <Text style={s.submitText}>{t.submit}</Text>}
              </LinearGradient>
            </Pressable>

            <Pressable
              disabled={busy}
              onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={s.link}
            >
              <Text style={[s.linkText, { color: dark ? '#F2A9CF' : '#A34E83' }]}>
                {mode === 'login' ? t.switchRegister : t.switchLogin}
              </Text>
            </Pressable>

            <Text style={[s.privacy, { color: colors.muted }]}>
              {t.privacy}
            </Text>
          </View>

          <Text style={[s.footer, { color: colors.muted }]}>
            TU BELLEZA, TUS REGLAS. ♡
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 30,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 9,
    marginBottom: 14,
  },
  actionButton: {
    minWidth: 42,
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { fontSize: 13, fontWeight: '700' },
  hero: { alignItems: 'center', paddingHorizontal: 5, paddingBottom: 24 },
  brand: {
    fontSize: 39,
    fontWeight: '800',
    letterSpacing: 5,
  },
  brandAccent: { color: '#ED4B91' },
  brandCaption: {
    color: '#C16B9D',
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 2,
    marginBottom: 23,
  },
  eyebrow: {
    color: '#D34D91',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.7,
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 9,
    maxWidth: 340,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 17,
  },
  feature: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  featureText: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 27,
    padding: 21,
    shadowColor: '#713858',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.09,
    shadowRadius: 22,
    elevation: 5,
  },
  welcome: {
    color: '#D34D91',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  cardTitle: { fontSize: 23, fontWeight: '700' },
  intro: { fontSize: 12, lineHeight: 19, marginTop: 6 },
  switch: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginTop: 21,
    marginBottom: 8,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 11,
  },
  active: {
    backgroundColor: '#C34F98',
    shadowColor: '#C34F98',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  switchText: { fontSize: 12, fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 13,
    marginTop: 12,
  },
  submit: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 19,
  },
  submitGradient: {
    minHeight: 51,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  submitText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  disabled: { opacity: 0.65 },
  link: { alignItems: 'center', paddingVertical: 17 },
  linkText: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  privacy: { fontSize: 10, textAlign: 'center', lineHeight: 16 },
  footer: {
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 20,
  },
});
