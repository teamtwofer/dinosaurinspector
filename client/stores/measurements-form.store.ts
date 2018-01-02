import { FieldState, FormState } from 'formstate';
import { action, computed, observable } from 'mobx';
import { Service } from 'typedi/decorators/Service';
import { lang } from '../../lang/index';
import { FlashMessageType } from '../../types/flash-messages';
import { IForm } from '../../types/form';
import { MeasurementType } from '../../types/measurement';
import { IUser } from '../../types/user';
import { FlashMessageStore } from './flash-message.store';
import { MeasurementsStore } from './measurements.store';
import { UserStore } from './user.store';
import { min } from './validators';

export interface Measurements {
  bodyFat?: number;
  bust?: number;
  calves?: number;
  chest?: number;
  forearms?: number;
  hips?: number;
  knees?: number;
  midway?: number;
  thighs?: number;
  upperArm?: number;
  waist?: number;
}

@Service()
export class MeasurementsFormStore
  implements IForm<{ measurements: Measurements }>,
    Record<keyof Measurements, FieldState<number>> {
  @observable isLoading = false;
  @observable isSuccess = false;
  @observable error: string;

  bodyFat = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.BodyFat), 0)
  );
  bust = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Bust), 0)
  );
  calves = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Calves), 0)
  );
  chest = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Chest), 0)
  );
  forearms = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Forearms), 0)
  );
  hips = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Hips), 0)
  );
  knees = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Knees), 0)
  );
  midway = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Midway), 0)
  );
  thighs = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Thighs), 0)
  );
  upperArm = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.UpperArm), 0)
  );
  waist = new FieldState(0).validators(
    min(lang.MEASUREMENT_NAME(MeasurementType.Waist), 0)
  );

  @observable
  form = new FormState([
    this.bust,
    this.calves,
    this.chest,
    this.forearms,
    this.hips,
    this.knees,
    this.midway,
    this.thighs,
    this.upperArm,
    this.waist,
  ]);

  constructor(
    private userStore: UserStore,
    private flashMessageStore: FlashMessageStore,
    private measurementsStore: MeasurementsStore
  ) {}

  @action.bound
  async setupForm() {
    if (
      !this.measurementsStore.measurements.isSuccess &&
      !this.measurementsStore.measurements.isFailure &&
      !this.measurementsStore.measurements.isPending
    ) {
      await this.measurementsStore.getMeasurements();
    }
    return Promise.resolve();
  }

  @action.bound
  updateError(message: string) {
    this.isLoading = false;
    this.isSuccess = false;
    this.error = message;
  }

  @action.bound
  succeed() {
    this.isLoading = false;
    this.isSuccess = true;
    this.flashMessageStore.addMessages({
      type: FlashMessageType.Success,
      content: lang.FLASH_CREATE_ACCOUNT(),
    });
  }

  @action.bound
  load() {
    this.isLoading = true;
    this.isSuccess = false;
  }

  @action.bound
  async create(): Promise<{ user: IUser; token: string } | void> {
    const errors = await this.form.validate();
    this.load();
    if (errors.hasError) {
      return;
    }

    try {
      const userAndTokenOrError = await fetch('/api/measurements', {
        body: JSON.stringify(this.value),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(r => r.json());

      if (userAndTokenOrError.message) {
        this.updateError(userAndTokenOrError.message);
        return;
      }

      this.succeed();

      if (userAndTokenOrError) {
        const { token, user } = userAndTokenOrError;
        this.userStore.updateUser(user, token);
      }
      return userAndTokenOrError;
    } catch (e) {
      this.updateError(e.message);
    }
  }

  @computed
  get value() {
    const {
      bodyFat: { $: bodyFat },
      bust: { $: bust },
      calves: { $: calves },
      chest: { $: chest },
      forearms: { $: forearms },
      hips: { $: hips },
      knees: { $: knees },
      midway: { $: midway },
      thighs: { $: thighs },
      upperArm: { $: upperArm },
      waist: { $: waist },
    } = this;
    return {
      measurements: {
        bodyFat,
        bust,
        calves,
        chest,
        forearms,
        hips,
        knees,
        midway,
        thighs,
        upperArm,
        waist,
      },
    };
  }
}
