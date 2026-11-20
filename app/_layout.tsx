import { Slot, router, usePathname } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  BookOpen,
  ChartNoAxesColumn,
  ChevronRight,
  CircleUserRound,
  House,
  LibraryBig,
  RotateCcw,
  Settings2,
  type LucideIcon,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StudyProvider } from "../src/study";

const tabs = [
  { path: "/", name: "Overview", icon: House },
  { path: "/learn", name: "Learn", icon: BookOpen },
  { path: "/review", name: "Review", icon: RotateCcw },
  { path: "/progress", name: "Progress", icon: ChartNoAxesColumn },
  { path: "/settings", name: "Settings", icon: Settings2 },
] as const;

function Brand() {
  return (
    <View style={s.brand}>
      <View style={s.stamp}>
        <Text allowFontScaling={false} style={s.stampText}>
          に
        </Text>
      </View>
      <Text style={s.brandText}>
        Nihongo<Text style={{ color: "#a94128" }}>Learn</Text>
      </Text>
    </View>
  );
}

function NavItem({
  tab,
  active,
  small,
}: {
  tab: (typeof tabs)[number];
  active: boolean;
  small: boolean;
}) {
  const Icon: LucideIcon = tab.icon;
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={() => {
        if (!active) router.navigate(tab.path);
      }}
      style={({ pressed }) => [
        small ? s.mobileTab : s.tab,
        active && !small && s.active,
        pressed && s.press,
      ]}
    >
      <Icon
        size={small ? 20 : 19}
        strokeWidth={active ? 2.3 : 1.7}
        color={active ? "#245643" : "#626b60"}
      />
      <Text style={[s.tabLabel, small && s.smallLabel, active && s.current]}>
        {tab.name}
      </Text>
    </Pressable>
  );
}

function Frame() {
  const path = usePathname();
  const { width } = useWindowDimensions();
  const wide = width >= 960;
  const session = path === "/session";
  const name = tabs.find((tab) => tab.path === path)?.name || "Lesson";
  return (
    <SafeAreaView style={s.full}>
      <StatusBar style="dark" />
      <View style={s.frame}>
        {wide && !session && (
          <View style={s.sidebar}>
            <Brand />
            <Text style={s.navGroup}>WORKSPACE</Text>
            <View accessibilityRole="tablist" style={{ gap: 5 }}>
              {tabs.map((tab) => (
                <NavItem
                  key={tab.path}
                  tab={tab}
                  active={path === tab.path}
                  small={false}
                />
              ))}
            </View>
            <View style={s.profile}>
              <View style={s.avatar}>
                <CircleUserRound size={24} color="#536348" />
              </View>
              <View>
                <Text style={s.profileName}>Guest learner</Text>
                <Text style={s.profileMeta}>Local profile</Text>
              </View>
            </View>
          </View>
        )}
        <View style={s.main}>
          {!session && (
            <View style={[s.top, !wide && s.topMobile]}>
              {wide ? (
                <View style={s.crumb}>
                  <LibraryBig size={17} color="#626b60" />
                  <Text style={s.muted}>Workspace</Text>
                  <ChevronRight size={13} color="#969a8c" />
                  <Text style={s.crumbName}>{name}</Text>
                </View>
              ) : (
                <Brand />
              )}
              <View style={s.local}>
                <View style={s.dot} />
                <Text style={s.localText}>Local study</Text>
              </View>
            </View>
          )}
          {session ? (
            <Slot />
          ) : (
            <ScrollView
              key={path}
              style={{ flex: 1 }}
              contentContainerStyle={s.scroll}
            >
              <View
                style={[
                  s.content,
                  { paddingHorizontal: wide ? 44 : width >= 640 ? 32 : 19 },
                ]}
              >
                <Slot />
              </View>
            </ScrollView>
          )}
          {!wide && !session && (
            <View style={s.bottom} accessibilityRole="tablist">
              {tabs.map((tab) => (
                <NavItem
                  key={tab.path}
                  tab={tab}
                  active={path === tab.path}
                  small
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  const [ready, error] = useFonts({
    DMSans: require("@expo-google-fonts/dm-sans/400Regular/DMSans_400Regular.ttf"),
    DMSansBold: require("@expo-google-fonts/dm-sans/700Bold/DMSans_700Bold.ttf"),
    DMSerifText: require("@expo-google-fonts/dm-serif-text/400Regular/DMSerifText_400Regular.ttf"),
  });
  return (
    <SafeAreaProvider>
      {(ready || error) && (
        <StudyProvider>
          <Frame />
        </StudyProvider>
      )}
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  full: { flex: 1, backgroundColor: "#f7f6f0" },
  frame: { flex: 1, flexDirection: "row" },
  main: { flex: 1, minWidth: 0 },
  sidebar: {
    width: 218,
    backgroundColor: "#f4f3ea",
    borderRightWidth: 1,
    borderColor: "#dddfd2",
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 24,
  },
  brand: { flexDirection: "row", gap: 10, alignItems: "center" },
  stamp: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#ba5034",
    alignItems: "center",
    justifyContent: "center",
  },
  stampText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff7ea",
    lineHeight: 32,
  },
  brandText: {
    fontFamily: "DMSerifText",
    fontSize: 23,
    letterSpacing: -1,
    color: "#253c31",
  },
  navGroup: {
    fontFamily: "DMSansBold",
    fontSize: 10,
    letterSpacing: 1.9,
    color: "#777d70",
    marginTop: 58,
    marginBottom: 14,
    marginLeft: 13,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 14,
    minHeight: 46,
    borderRadius: 9,
  },
  active: { backgroundColor: "#dfe8d9" },
  tabLabel: { fontFamily: "DMSans", fontSize: 15, color: "#586256" },
  current: { color: "#1e503f", fontFamily: "DMSansBold" },
  profile: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderColor: "#d7dccf",
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e8da",
  },
  profileName: { fontFamily: "DMSansBold", fontSize: 13, color: "#2d4236" },
  profileMeta: { fontFamily: "DMSans", fontSize: 12, color: "#667363" },
  top: {
    minHeight: 64,
    paddingHorizontal: 44,
    borderBottomWidth: 1,
    borderColor: "#dddfd3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topMobile: { paddingHorizontal: 19, minHeight: 60 },
  crumb: { flexDirection: "row", alignItems: "center", gap: 10 },
  muted: { fontFamily: "DMSans", fontSize: 13, color: "#737a6d" },
  crumbName: { fontFamily: "DMSansBold", fontSize: 13, color: "#485748" },
  local: { flexDirection: "row", alignItems: "center", gap: 7 },
  localText: { fontFamily: "DMSans", fontSize: 12, color: "#59684f" },
  dot: { height: 7, width: 7, borderRadius: 4, backgroundColor: "#73926a" },
  scroll: { alignItems: "center" },
  content: { width: "100%", maxWidth: 1350, paddingTop: 27, paddingBottom: 38 },
  bottom: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#d9ddcf",
    backgroundColor: "#f7f6f0",
  },
  mobileTab: {
    flex: 1,
    minHeight: 59,
    justifyContent: "center",
    gap: 3,
    alignItems: "center",
  },
  smallLabel: { fontSize: 11 },
  press: { opacity: 0.72 },
});
