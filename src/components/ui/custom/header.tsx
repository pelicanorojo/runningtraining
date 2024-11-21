import HeaderTitle from '@/components/ui/custom/headerTitle';
import PlanSelector from '@/components/ui/custom/planSelector';
import RaceDateSelector from '@/components/ui/custom/raceDateSelector';
import AuthBox from '@/components/ui/custom/authBox';

export default function Header() {
  return (
    <header role="header" className="border-b">
      <HeaderTitle title="Marathon Training Planner"/>
    {/* Controls */}
    <div className="container py-4">
      <div className="flex justify-between items-center">
        <PlanSelector />

        {/* Date & User */}
        <div className="flex items-center space-x-6">
          <RaceDateSelector />
          <AuthBox />
        </div>
      </div>
    </div>
    </header>
  );
}